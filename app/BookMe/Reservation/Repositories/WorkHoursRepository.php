<?php

namespace App\BookMe\Reservation\Repositories;

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

}
