<?php

namespace App\BookMe\Reservation\Services;

use App\BookMe\JobsServices\Repositories\ServiceRepository;
use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\WorkHours\Repositories\WorkHoursRepository;
use App\BookMe\Utility\Response;
use App\DateFormatTrait;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ListAvailableReservationService
{
    private WorkHoursRepository $workHoursRepository;
    private ServiceRepository $serviceRepository;
    private ReservationRepository $reservationRepository;

    public function __construct(WorkHoursRepository $workHoursRepository,
                                ReservationRepository $reservationRepository,
                                ServiceRepository $serviceRepository)
    {
        $this->workHoursRepository = $workHoursRepository;
        $this->serviceRepository = $serviceRepository;
        $this->reservationRepository = $reservationRepository;
    }

    public function execute(array $request): JsonResponse
    {
        try {
            $dateNow = Carbon::now()->setTimezone('Europe/Warsaw');
            $dateNow->add('1800', 'seconds');
            $service = $this->serviceRepository->find($request['service_id']);
            $workHours = $this->workHoursRepository->getAllEmployee($request['employee_id']);

            $reservations = $this->reservationRepository->getAllEmployee($request['employee_id']);
            $serviceDuration = $service->duration_time;

            foreach ($workHours as $partial) {
                if ($partial->datetime_start < $dateNow) {
                    continue;
                }
                $startTime = $partial->datetime_start;
                $end = $partial->datetime_end;
                $tempEndTime = Carbon::parse($startTime);
                $checkTime = Carbon::parse($startTime);
                $tempEndTime->add($serviceDuration, 'seconds');

                while ($startTime <= $end) {
//              Log::alert('---');
//              Log::alert($startTime);
//              Log::alert($tempEndTime);
//              Log::alert($end);
//              Log::alert($checkTime);
                    if ($checkTime->add($serviceDuration, 'seconds') > $end) {
                        break;
                    }
                    $reservationConflict = $this->checkConflict($startTime, $tempEndTime, $reservations);
                    if ($reservationConflict['status']) {
                        $startTime = Carbon::parse($reservationConflict['first_available_time']);
                        $tempEndTime = Carbon::parse($reservationConflict['first_available_time']);
                        $tempEndTime->add($serviceDuration, 'seconds');
                        continue;
                    } else {
                        $temp['from'] = DateFormatTrait::format_His($startTime);
                        $temp['to'] = DateFormatTrait::format_His($tempEndTime);
                        $startTime->add($serviceDuration, 'seconds');
                        $tempEndTime->add($serviceDuration, 'seconds');
                        $checkTime->setDateTimeFrom($startTime);
                    }
                    $result[DateFormatTrait::format_Ymd($startTime)]['available_status'][] = (object)$temp;
                    $result[DateFormatTrait::format_Ymd($startTime)]['counter'] = count($result[DateFormatTrait::format_Ymd($startTime)]['available_status']);
                    $temp = [];
                }
            }
            return Response::build($result, 200, "msg/success.list");
        } catch(Exception $exception){
            return Response::build([], 204, "msg/success.list");
        }

    }

    private function checkConflict($startTime, $tempEndTime, $reservations): array
    {
        $checkArray['first_available_time'] = null;
        $checkArray['status'] = null;
        $startTime = DateFormatTrait::format_Ymd_His($startTime);
        $tempEndTime = DateFormatTrait::format_Ymd_His($tempEndTime);

        foreach ($reservations as $reservation) {
            $resFrom = DateFormatTrait::format_Ymd_His($reservation->datetime_start);
            $resTo = DateFormatTrait::format_Ymd_His($reservation->datetime_end);
//            Log::alert('------');
//            Log::alert($startTime);
//            Log::alert($tempEndTime);
//            Log::alert($resFrom);
//            Log::alert($resTo);
            if ($startTime == $resFrom && $tempEndTime == $resTo) {
                //Log::alert('ERROR ==');
                $checkArray['first_available_time'] = $resTo;
                $checkArray['status'] = true;
                return $checkArray;
            }

            if ($startTime > $resFrom && $startTime < $resTo) {
                //Log::alert('ERROR 1');
                $checkArray['first_available_time'] = $resTo;
                $checkArray['status'] = true;
                return $checkArray;
            }
            if ($tempEndTime > $resFrom && $tempEndTime < $resTo) {
                //Log::alert('ERROR 2');
                $checkArray['first_available_time'] = $resTo;
                $checkArray['status'] = true;
                return $checkArray;
            }
        }
        $checkArray['status'] = false;
        return $checkArray;
    }
}
