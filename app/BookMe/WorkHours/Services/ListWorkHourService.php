<?php

namespace App\BookMe\WorkHours\Services;

use App\BookMe\Utility\Response;
use App\BookMe\WorkHours\Repositories\WorkHoursRepository;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class ListWorkHourService
{
    private WorkHoursRepository $workHoursRepository;

    public function __construct(WorkHoursRepository $workHoursRepository)
    {
        $this->workHoursRepository = $workHoursRepository;
    }

    public function execute(array $request): JsonResponse
    {
        $workHours=$this->workHoursRepository->getByDate($request['date']);
        $result['wok']
        if(isset($request['employee_id']))
        {
            $employeeWorkHour=$workHours->where('employee_id',$request['employee_id']);
            return Response::build($employeeWorkHour, 200, "msg/success.list");
        }
        return Response::build($workHours, 200, "msg/success.list");
    }
}
