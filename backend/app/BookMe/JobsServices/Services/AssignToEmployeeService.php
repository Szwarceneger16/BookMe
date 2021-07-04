<?php


namespace App\BookMe\JobsServices\Services;


use App\BookMe\Employee\Repositories\EmployeeRepository;
use App\BookMe\JobsServices\Repositories\ServiceRepository;
use App\BookMe\Utility\Response;
use Exception;
use Illuminate\Http\JsonResponse;

class AssignToEmployeeService
{
    private EmployeeRepository $employeeRepository;
    private ServiceRepository $serviceRepository;

    public function __construct(EmployeeRepository $employeeRepository,
                                ServiceRepository $serviceRepository)
    {
        $this->employeeRepository = $employeeRepository;
        $this->serviceRepository = $serviceRepository;
    }

    public function execute(array $request): JsonResponse
    {
        try {
            $employee = $this->employeeRepository->find($request['employee_id']);
            $employee->services()->syncWithoutDetaching($request['services']);
            return Response::build($employee->services()->get(), 200, "msg/success.store");
        } catch (Exception $e) {
            return Response::build([], 400, "msg/success.store");
        }
    }
}

