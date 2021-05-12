<?php

namespace App\BookMe\WorkHours\Services;

use App\BookMe\Utility\Response;
use App\BookMe\WorkHours\Repositories\WorkHoursRepository;
use App\BookMe\WorkHours\Resources\ListWorkHoursResource;
use App\Models\Employee;
use App\Models\Place;
use App\Models\Reservation;
use App\Models\User;
use App\Models\WorkHour;
use Exception;
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
        try{
        $workHours=$this->workHoursRepository->getByDate($request['date']);
        $result['date']=$request['date'];
        if(isset($request['employee_id']))
        {
            $employeeWorkHour=$workHours->where('employee_id',$request['employee_id']);
            $result['work_hours']=ListWorkHoursResource::collection($employeeWorkHour);
            return Response::build($result, 200, "msg/success.list");
        }
        $result['work_hours']=ListWorkHoursResource::collection($workHours);
        return Response::build($result, 200, "msg/success.list");
        }catch(Exception $exception){
            return Response::build($exception, 400, "msg/error.list");
        }
    }
}
