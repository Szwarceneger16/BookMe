<?php

namespace App\BookMe\User\Repositories;

use App\Models\Employee;

class EmployeeRepository
{
    private Employee $employee;

    public function __construct(Employee $employee)
    {
        $this->employee=$employee;
    }

    public function find(int $id)
    {
        return $this->employee->find($id);
    }

}
