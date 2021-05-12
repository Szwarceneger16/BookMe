<?php

namespace App\Http\Controllers;

use App\BookMe\Reservation\Request\CancelReservationRequest;
use App\BookMe\Reservation\Request\ListAllReservationRequest;
use App\BookMe\Reservation\Request\ListAvailableReservationRequest;
use App\BookMe\Reservation\Request\StoreReservationRequest;
use App\BookMe\Reservation\Services\CancelReservationService;
use App\BookMe\Reservation\Services\ListAllReservationService;
use App\BookMe\Reservation\Services\ListAvailableReservationService;
use App\BookMe\Reservation\Services\ListClientEveryReservationsService;
use App\BookMe\Reservation\Services\ListClientReservationsService;
use App\BookMe\Reservation\Services\StoreReservationService;
use App\BookMe\User\Enums\AccountType;
use App\Models\Employee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Psy\Util\Json;

/**
 * @group Reservations
 *
 * APIs for using Reservations
 */
class ReservationController extends Controller
{
    private StoreReservationService $storeReservationService;
    private ListAvailableReservationService $listAvailableReservationService;
    private ListClientReservationsService $listClientReservationsService;
    private CancelReservationService $cancelReservationService;
    private ListAllReservationService $listAllReservationService;
    private ListClientEveryReservationsService $listClientEveryReservationsService;
    public function __construct(StoreReservationService $storeReservationService,
                                ListAvailableReservationService $listAvailableReservationService,
                                ListClientReservationsService $listClientReservationsService,
                                CancelReservationService $cancelReservationService,
                                ListAllReservationService $listAllReservationService,
                                ListClientEveryReservationsService $listClientEveryReservationsService)
    {
        $this->storeReservationService = $storeReservationService;
        $this->listAvailableReservationService = $listAvailableReservationService;
        $this->listClientReservationsService = $listClientReservationsService;
        $this->cancelReservationService = $cancelReservationService;
        $this->listAllReservationService = $listAllReservationService;
        $this->listClientEveryReservationsService = $listClientEveryReservationsService;
    }

    /**
     * List available reservations
     *
     * List available reservations
     * @bodyParam employee_id integer required Employee id. Example: 1
     * @bodyParam service_id integer required Service id. Example: 1
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Data was returned",
     *    "status": 200
     *    }
     *
     * @param ListAvailableReservationRequest $request
     * @return JsonResponse
     */
    public function listAvailable(ListAvailableReservationRequest $request): JsonResponse
    {
        return $this->listAvailableReservationService->execute($request->validated());
    }

    /**
     * Store new reservation
     *
     * Store new reservation
     * @bodyParam datetime_start date required Datetime start reservation. Example: "2019-09-18T19:00:00Z"
     * @bodyParam datetime_end date required Datetime end password. Example: "2019-09-18T19:30:00Z"
     * @bodyParam client_id integer required Client id. Example: 1
     * @bodyParam employee_id integer required Employee id. Example: 1
     * @bodyParam place_id integer required Place id. Example: 1
     * @bodyParam service_id integer required Service id. Example: 1
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Records was stored",
     *    "status": 201
     *    }
     *
     * @param StoreReservationRequest $request
     * @return JsonResponse
     */
    public function store(StoreReservationRequest $request): JsonResponse
    {
        return $this->storeReservationService->execute($request->validated());
    }

    public function listClientReservations(): JsonResponse
    {
        return $this->listClientReservationsService->execute();
    }

    public function listClientEveryReservations(): JsonResponse
    {
        return $this->listClientEveryReservationsService->execute();
    }

    public function cancelReservation(CancelReservationRequest $request): JsonResponse
    {
        return $this->cancelReservationService->execute($request->validated());
    }

    /**
     * List all reservation (daily)
     *
     * List all reservation (daily)
     * @bodyParam date date required Date. Example: "2019-09-18"
     * @bodyParam employee_id integer Employee_id. Example: 1
     * @authenticated
     *
     * @param ListAllReservationRequest $request
     * @return JsonResponse
     */
    public function listAll(ListAllReservationRequest $request): JsonResponse
    {
        return $this->listAllReservationService->execute($request->validated());
    }
}
