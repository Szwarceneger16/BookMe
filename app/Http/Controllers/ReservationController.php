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
use App\BookMe\Reservation\Services\ListClientActiveReservationsService;
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
    private ListClientActiveReservationsService $listClientActiveReservationsService;
    private CancelReservationService $cancelReservationService;
    private ListAllReservationService $listAllReservationService;
    private ListClientEveryReservationsService $listClientEveryReservationsService;
    public function __construct(StoreReservationService $storeReservationService,
                                ListAvailableReservationService $listAvailableReservationService,
                                ListClientActiveReservationsService $listClientActiveReservationsService,
                                CancelReservationService $cancelReservationService,
                                ListAllReservationService $listAllReservationService,
                                ListClientEveryReservationsService $listClientEveryReservationsService)
    {
        $this->storeReservationService = $storeReservationService;
        $this->listAvailableReservationService = $listAvailableReservationService;
        $this->listClientActiveReservationsService = $listClientActiveReservationsService;
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


    /**
     * List Client's Active Reservations.
     *
     * Returning all reservations which can be canceled.
     * @authenticated
     * @response {
     *   "data": [
     *       {
     *       "id": 32,
     *       "service": "Porada fizjoterapeutyczna",
     *       "employee": "Kuba Nowak",
     *       "date": "2021-05-13 08:00:00",
     *       "time": 25
     *       },
     *       {
     *       "id": 34,
     *       "service": "Kinezjoterapia",
     *       "employee": "Kuba Nowak",
     *       "date": "2021-05-17 17:13:20",
     *       "time": 33.333333333333336
     *       },
     *       {
     *       "id": 35,
     *       "service": "Porada fizjoterapeutyczna",
     *       "employee": "Kuba Nowak",
     *       "date": "2021-05-20 17:30:00",
     *       "time": 25
     *       }
     *   ],
     *   "message": "Data was returned",
     *   "status": 200
     *   }
     *
     * @return JsonResponse
     */
    public function listClientActiveReservations(): JsonResponse
    {
        return $this->listClientActiveReservationsService->execute();
    }

    /**
     * List Client's Every Reservations
     *
     * List all reservations also this finised and canceled.
     * @authenticated
     * @response {
     *    "data": "[
     *       {
     *       "id": 26,
     *       "service": "Porada fizjoterapeutyczna",
     *       "employee": "Kuba Nowak",
     *       "date": "2021-05-12 15:30:00",
     *       "time": 25,
     *       "active": "UNACTIVE",
     *       "payment_status": "REFFUNDED"
     *       },
     *       {
     *       "id": 27,
     *       "service": "Porada fizjoterapeutyczna",
     *       "employee": "Kuba Nowak",
     *       "date": "2021-05-12 13:35:00",
     *       "time": 25,
     *       "active": "UNACTIVE",
     *       "payment_status": null
     *       },
     *       {
     *       "id": 28,
     *       "service": "Porada fizjoterapeutyczna",
     *       "employee": "Kuba Nowak",
     *       "date": "2021-05-12 17:35:00",
     *       "time": 25,
     *       "active": "UNACTIVE",
     *       "payment_status": "REFFUNDED"
     *       }]",
     *    "message": "Data was returned",
     *    "status": 200
     *    }
     *
     * @param ListAvailableReservationRequest $request
     * @return JsonResponse
     */
    public function listClientEveryReservations(): JsonResponse
    {
        return $this->listClientEveryReservationsService->execute();
    }


    /**
     * Cancel reservation
     *
     * List available reservations
     * @bodyParam reservation_id integer required Reservation id. Example: 1
     * @authenticated
     * @response {
     *    "data": "true",
     *    "message": "Records was updated",
     *    "status": 200
     *    }
     *
     * @param CancelReservationRequest $request
     * @return JsonResponse
     */
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
