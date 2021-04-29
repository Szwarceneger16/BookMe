<?php

namespace App\BookMe\Reservation\Services;

use App\BookMe\JobsServices\Repositories\ServiceRepository;
use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Reservation\Repositories\WorkHoursRepository;
use App\BookMe\Utility\Response;
use App\DateFormatTrait;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

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
        $dateNow = Carbon::now()->setTimezone('Europe/Warsaw');
        $dateNow->add('1800', 'seconds');

        $service = $this->serviceRepository->find($request['service_id']);
        $workHours = $this->workHoursRepository->getAllEmployee($request['employee_id']);
        $reservations = $this->reservationRepository->getAll();
        $serviceDuration = $service->duration_time;

        foreach ($workHours as $partial) {
            if ($partial->datetime_start < $dateNow) {
                //continue;
            }
            $startTime = $partial->datetime_start;
            $end = $partial->datetime_end;
            $tempEndTime = Carbon::parse($startTime);
            $checkTime = Carbon::parse($startTime);
            $tempEndTime->add($serviceDuration, 'seconds');

            while ($startTime <= $end) {
                if ($checkTime->add($serviceDuration, 'seconds') > $end) {
                    break;
                }
                $reservationConflict = $this->checkConflict($startTime, $tempEndTime, $reservations);
                if ($reservationConflict['status']) {
                    $startTime = Carbon::parse($reservationConflict['time_after']);
                    $tempEndTime = Carbon::parse($reservationConflict['time_after']);
                    $tempEndTime->add($serviceDuration, 'seconds');
                    continue;
                } else {
                    $temp['from'] = DateFormatTrait::format_His($startTime);
                    $temp['to'] = DateFormatTrait::format_His($tempEndTime);
                    $startTime->add($serviceDuration, 'seconds');
                    $tempEndTime->add($serviceDuration, 'seconds');
                }
                $result[DateFormatTrait::format_Ymd($startTime)]['available_status'][] = (object)$temp;
                $result[DateFormatTrait::format_Ymd($startTime)]['counter'] = count($result[DateFormatTrait::format_Ymd($startTime)]['available_status']);
                $temp = [];
            }
        }
        dd('xd');
        return Response::build($result, 200, "msg/success.list");
    }

    private function checkConflict($startTime, $tempEndTime, $reservations): array
    {

        $checkArray['time_after'] = null;
        $checkArray['status'] = null;
        $startTime = DateFormatTrait::format_Ymd_His($startTime);
        $tempEndTime = DateFormatTrait::format_Ymd_His($tempEndTime);

        foreach ($reservations as $reservation) {
            $resFrom = DateFormatTrait::format_Ymd_His($reservation->datetime_start);
            $resTo = DateFormatTrait::format_Ymd_His($reservation->datetime_end);
            dump('------');
            dump($startTime);
            dump($tempEndTime);
            dump($resFrom);
            dump($resTo);
            if ($startTime == $resFrom && $tempEndTime == $resTo) {
                dump('ERROR ==');
                $checkArray['time_after'] = $resTo;
                $checkArray['status'] = true;
                return $checkArray;
            }

            if ($startTime > $resFrom && $startTime < $resTo) {
                dump('ERROR 1');
                $checkArray['time_after'] = $resTo;
                $checkArray['status'] = true;
                return $checkArray;
            }
            if ($tempEndTime > $resFrom && $tempEndTime < $resTo) {
                dump('ERROR 2');
                $checkArray['time_after'] = $resTo;
                $checkArray['status'] = true;
                return $checkArray;
            }
        }
        $checkArray['status'] = false;
        return $checkArray;
    }
}
