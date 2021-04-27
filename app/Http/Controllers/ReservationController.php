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
