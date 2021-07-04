<?php

namespace App\BookMe\Employee\Repositories;

use App\Models\Employee;

class EmployeeRepository
{
    private Employee $employee;

    public function __construct(Employee $employee)
    {
        $this->employee=$employee;
    }

    public function listEmployees()
    {
        return $this->employee->all();
    }

    public function addEmployee($data)
    {
        return $this->employee->create($data);
    }

    public function find(int $id)
    {
        return $this->employee->find($id);
    }
}
