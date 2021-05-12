<?php

namespace App\Http\Controllers;

use App\BookMe\Reservation\Services\StoreReservationService;
use App\BookMe\WorkHours\Request\ListWorkHourRequest;
use App\BookMe\WorkHours\Request\StoreWorkHourRequest;
use App\BookMe\WorkHours\Services\ListWorkHourService;
use App\BookMe\WorkHours\Services\StoreWorkHourService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Psy\Util\Json;

/**
 * @group WorkHour
 *
 * APIs for using WorkHour
 */
class WorkHourController extends Controller
{
    private StoreWorkHourService $storeWorkHourService;
    private ListWorkHourService $listWorkHourService;

    public function __construct(StoreWorkHourService $storeWorkHourService,ListWorkHourService $listWorkHourService)
    {
        $this->storeWorkHourService = $storeWorkHourService;
        $this->listWorkHourService = $listWorkHourService;
    }

    /**
     * Store new workHours
     *
     * Store new workHours
     * @bodyParam datetime_start date required Datetime start reservation. Example: "2019-09-18T19:00:52Z"
     * @bodyParam datetime_end date required Datetime end password. Example: "2019-09-18T19:30:52Z"
     * @bodyParam employee_id integer required Employee id. Example: 1
     * @bodyParam place_id integer required Place id. Example: 1
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Records was stored",
     *    "status": 201
     *    }
     *
     *
     * @param StoreWorkHourRequest $request
     * @return JsonResponse
     */
    public function store(StoreWorkHourRequest $request): JsonResponse
    {
        return $this->storeWorkHourService->execute($request->validated());
    }

    /**
     * List all Workhours (daily)
     *
     * List all Workhours (daily)
     * @bodyParam date date required Date. Example: "2019-09-18"
     * @bodyParam employee_id integer Employee_id. Example: 1
     * @authenticated
     *
     * @param ListWorkHourRequest $request
     * @return JsonResponse
     */
    public function list(ListWorkHourRequest $request): JsonResponse
    {
        return $this->listWorkHourService->execute($request->validated());
    }
}
