<?php

namespace App\Http\Controllers;

use App\BookMe\Employee\Request\ListEmployeeByServiceRequest;
use App\BookMe\Employee\Services\ListEmployeesByServiceService;
use App\BookMe\Employee\Services\ListEmployeesService;
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

    public function __construct(ListEmployeesService $listEmployeesService,
                                ListEmployeesByServiceService $listEmployeesByServiceService)
    {
        $this->listEmployeesService = $listEmployeesService;
        $this->listEmployeesByServiceService = $listEmployeesByServiceService;
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
}
