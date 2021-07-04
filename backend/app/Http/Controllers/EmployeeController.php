<?php

namespace App\Http\Controllers;

use App\BookMe\Employee\Request\ListEmployeeByServiceRequest;
use App\BookMe\Employee\Request\StoreEmployeeRequest;
use App\BookMe\Employee\Services\AddEmployeeService;
use App\BookMe\Employee\Services\ListEmployeesByServiceService;
use App\BookMe\Employee\Services\ListEmployeesService;
use App\BookMe\Utility\Response;
use App\Models\Employee;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


/**
 * @group Employees
 *
 * APIs for employees
 */
class EmployeeController extends Controller
{
    private ListEmployeesService $listEmployeesService;
    private ListEmployeesByServiceService $listEmployeesByServiceService;
    private AddEmployeeService $addEmployeeService;

    public function __construct(ListEmployeesService $listEmployeesService,
                                ListEmployeesByServiceService $listEmployeesByServiceService,
                                AddEmployeeService $addEmployeeService)
    {
        $this->listEmployeesService = $listEmployeesService;
        $this->listEmployeesByServiceService = $listEmployeesByServiceService;
        $this->addEmployeeService = $addEmployeeService;
    }

    /**
     * List all Employees
     *
     * List all Employees
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Data was returned",
     *    "status": 200
     *    }
     */
    public function index(): JsonResponse
    {
        return $this->listEmployeesService->execute();
    }

    /**
     * List employees by service_id
     *
     * List employees by service_id
     * @bodyParam service_id integer required Service id. Example: 1
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Data was returned",
     *    "status": 200
     *    }
     *
     * @param ListEmployeeByServiceRequest $request
     * @return JsonResponse
     */
    public function listEmployeesByService(ListEmployeeByServiceRequest $request): JsonResponse
    {
        return $this->listEmployeesByServiceService->execute($request->validated());
    }

    /**
     * Create employee
     *
     * Create employee
     * @bodyParam job_title string required Job title field Example: recepcjonistka
     * @bodyParam account_type string required Account type field Example: ADMIN
     * @bodyParam email string required Email field Example: test@test.pl
     * @bodyParam password string required Password field. Example: 12345678
     * @bodyParam first_name string required First name field. Example: Jan
     * @bodyParam last_name string required Last name field. Example: Nowak
     * @bodyParam phone string required Password field. Example: 123 456 789
     * @authenticated
     *
     * @param StoreEmployeeRequest $request
     * @return JsonResponse
     */
    public function store(StoreEmployeeRequest $request): JsonResponse
    {
        return $this->addEmployeeService->execute($request->validated());
    }

    /**
     * Delete employee (with user)
     *
     * Delete employee (with user)
     * @bodyParam id integer required Employee id field Example: 15
     * @authenticated
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try{
            $employee = Employee::findOrFail($id);
            return Response::build($employee->delete(), 200, "msg/success.delete");
        }catch(Exception $e){
            return Response::build([], 200, "msg/error.delete");
        }
    }
}
