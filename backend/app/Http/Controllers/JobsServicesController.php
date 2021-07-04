<?php

namespace App\Http\Controllers;

use App\BookMe\JobsServices\Requests\AssignServiceToEmployeeRequest;
use App\BookMe\JobsServices\Services\AssignToEmployeeService;
use App\BookMe\JobsServices\Services\ShowAllService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Psy\Util\Json;


/**
 * @group Services
 *
 * APIs for services
 */
class JobsServicesController extends Controller
{
    public ShowAllService $showAllService;
    private AssignToEmployeeService $assignToEmployeeService;

    public function __construct(ShowAllService $showAllService,
                                AssignToEmployeeService $assignToEmployeeService)
    {
        $this->showAllService = $showAllService;
        $this->assignToEmployeeService = $assignToEmployeeService;
    }

    /**
     * List all Services
     *
     * List all Services
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Data was returned",
     *    "status": 200
     *    }
     */
    public function index(): JsonResponse
    {
        return $this->showAllService->execute();
    }

    /**
     * Assign services to employee
     *
     * Assign services to employee
     * @bodyParam id integer required Employee id field Example: 15
     * @bodyParam services[].id int Service id. Example: [1,2,4]
     * @authenticated
     *
     * @response {
     *    "data": "[]",
     *    "message": "Data was returned",
     *    "status": 200
     *    }
     *
     * @param AssignServiceToEmployeeRequest $request
     * @return JsonResponse
     */
    public function assignToEmployee(AssignServiceToEmployeeRequest $request): JsonResponse
    {
        return $this->assignToEmployeeService->execute($request->validated());
    }
}
