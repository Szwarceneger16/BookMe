<?php

namespace App\BookMe\WorkHours\Repositories;

use App\Models\WorkHour;

class WorkHoursRepository
{
    private WorkHour $workHour;

    public function __construct(WorkHour $workHour)
    {
        $this->workHour=$workHour;
    }

    public function find(int $id)
    {
        return $this->workHour->find($id);
    }

    public function getAllEmployee($employeeId)
    {
        return $this->workHour->where('employee_id',$employeeId)->orderBy('datetime_start', 'ASC')->get();
    }

    public function getByDate($date)
    {
        return $this->workHour->whereDate('datetime_start',$date)->get();
    }

    public function getAllPlace($placeId)
    {
        return $this->workHour->where('place_id',$placeId)->orderBy('datetime_start', 'ASC')->get();
    }

    public function checkAvailability($employeeId,$placeId,$from,$to)
    {
        return $this->workHour
            ->where('employee_id',$employeeId)
            ->whereBetween('datetime_start', [$from, $to])
            ->orWhereBetween('datetime_end', [$from, $to])
            ->first();
    }

    public function create(Object $workHour)
    {
        return $this->workHour->create($workHour->toArray());
    }
}
