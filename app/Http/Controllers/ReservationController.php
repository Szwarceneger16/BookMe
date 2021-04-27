<?php

namespace App\Http\Controllers;

use App\BookMe\Reservation\Request\StoreReservationRequest;
use App\BookMe\Reservation\Services\StoreReservationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Psy\Util\Json;

class ReservationController extends Controller
{

    private StoreReservationService $storeReservationService;

    public function __construct(StoreReservationService $storeReservationService)
    {
        $this->storeReservationService=$storeReservationService;
    }

    public function index()
    {
        //
    }


    public function create()
    {
        //
    }

    /**
     * Store new reservation
     *
     * Store new reservation
     * @bodyParam datetime_start date required Datetime start reservation. Example: "2019-09-18T19:00:52Z"
     * @bodyParam datetime_end date required Datetime end password. Example: "2019-09-18T19:30:52Z"
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
    public function store(StoreReservationRequest $request):JsonResponse
    {
        return $this->storeReservationService->execute($request->validated());
    }

    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }
}
