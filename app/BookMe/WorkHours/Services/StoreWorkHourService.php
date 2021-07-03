<?php

namespace App\BookMe\WorkHours\Services;

use App\BookMe\Employee\Repositories\EmployeeRepository;
use App\BookMe\Utility\Response;
use App\BookMe\WorkHours\Repositories\WorkHoursRepository;
use App\DateFormatTrait;
use App\Models\WorkHour;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;

class StoreWorkHourService
{

    private WorkHoursRepository $workHoursRepository;

    public function __construct(WorkHoursRepository $workHoursRepository)
    {
        $this->workHoursRepository = $workHoursRepository;
    }

    public function execute(array $request): JsonResponse
    {
        try {
            $employeeWorkHour = $this->workHoursRepository->getAllEmployee($request['employee_id']);
            if (!$employeeWorkHour->toArray() == []) {
                $statusEmployee = $this->checkAvailabilityWorkHours($employeeWorkHour, $request);
                if ($statusEmployee == true) {
                    return Response::build('Podany przedział czasowy koliduje z terminarzem pracownika!', 200, "msg/error.store");
                }
            }

            $placeWorkHour = $this->workHoursRepository->getAllPlace($request['place_id']);
            if (!$placeWorkHour->toArray() == []) {
                $statusPlace = $this->checkAvailabilityWorkHours($placeWorkHour, $request);
                if ($statusPlace == true) {
                    return Response::build('Podany przedział czasowy koliduje z terminarzem stanowiska!', 200, "msg/error.store");
                }
            }
            $workHour = $this->prepareWorkHourObject($request);
            $workHourModel = $this->workHoursRepository->create($workHour);;
            return Response::build($workHourModel, 201, "msg/success.store");
        } catch (Exception $exception) {
            return Response::build($exception, 400, "msg/error.store");
        }
    }

    private function checkAvailabilityWorkHours($checkBy, $request): bool
    {
        $requestStartTime = Carbon::parse($request['datetime_start']);
        $requestEndTime = Carbon::parse($request['datetime_end']);

        foreach ($checkBy->toArray() as $record) {
            $busyFrom = Carbon::parse($record['datetime_start']);
            $busyTo = Carbon::parse($record['datetime_end']);
            $status = $this->checkTimeConditions($requestStartTime, $requestEndTime, $busyFrom, $busyTo);
            if ($status == true) {
                return true;
            }
        }
        return false;
    }

    private function checkTimeConditions($requestStartTime, $requestEndTime, $busyFrom, $busyTo): bool
    {
        if ($requestStartTime == $busyFrom && $requestEndTime == $busyTo) {
            return true;
        }
        if ($requestStartTime > $busyFrom && $requestStartTime < $busyTo) {
            return true;
        }
        if ($requestEndTime > $busyFrom && $requestEndTime < $busyTo) {
            return true;
        }
        if ($requestStartTime < $busyFrom && ($requestEndTime <= $busyTo && $requestEndTime > $busyFrom)) {
            return true;
        }
        if ($requestStartTime > $busyFrom && ($requestEndTime > $busyTo && $requestEndTime <= $busyTo)) {
            return true;
        }
        if ($requestStartTime < $busyFrom && $requestEndTime > $busyTo) {
            return true;
        }
        return false;
    }

    private function prepareWorkHourObject(array $request): WorkHour
    {
        $workHour = new WorkHour();
        $workHour->datetime_start = $request['datetime_start'];
        $workHour->datetime_end = $request['datetime_end'];
        $workHour->employee_id = $request['employee_id'];
        $workHour->place_id = $request['place_id'];
        return $workHour;
    }
}
