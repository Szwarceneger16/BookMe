<?php

namespace App\BookMe\Employee\Services;

use App\BookMe\Employee\Repositories\EmployeeRepository;
use App\BookMe\Employee\Resources\ListEmployeesResource;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;

class ListEmployeesService
{
    private EmployeeRepository $employeeRepository;

    public function __construct(EmployeeRepository $employeeRepository)
    {
        $this->employeeRepository=$employeeRepository;
    }

    public function execute(): JsonResponse
    {
        $employees = $this->employeeRepository->listEmployees();
        $employeesMapped = ListEmployeesResource::collection($employees);
        return Response::build($employeesMapped, 200, "msg/success.list");
    }

}
