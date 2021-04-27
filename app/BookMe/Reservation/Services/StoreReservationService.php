<?php

declare(strict_types=1);

namespace App\BookMe\Reservation\Services;

use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Utility\Response;
use App\Models\Reservation;
use Exception;
use Illuminate\Http\JsonResponse;

class StoreReservationService
{
    private ReservationRepository $reservationRepository;

    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function execute(array $request): JsonResponse
    {
        try {
            $reservation = $this->prepareReservationObject($request);
            $reservation = $this->reservationRepository->create($reservation);
            return Response::build($reservation, 201, "msg/success.store");
        }catch(Exception $exception)
        {
            return Response::build($exception, 201, "msg/error.store");
        }
    }

    private function prepareReservationObject(array $request): Reservation
    {
        $reservation = new Reservation();
        $reservation->datetime_start = $request['datetime_start'];
        $reservation->datetime_end = $request['datetime_end'];
        $reservation->client_id = $request['client_id'];
        $reservation->employee_id = $request['employee_id'];
        $reservation->place_id = $request['place_id'];
        $reservation->service_id = $request['service_id'];
        return $reservation;
    }

}
