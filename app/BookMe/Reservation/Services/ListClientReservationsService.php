<?php

declare(strict_types=1);

namespace App\BookMe\Reservation\Services;

use App\BookMe\Reservation\Repositories\ReservationRepository;
use Illuminate\Http\JsonResponse;

class ListClientReservationsService
{
    private ReservationRepository $reservationRepository;

    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function execute(): JsonResponse
    {
        $user = auth()->user();
        $clientReservations = $this->reservationRepository->getClientReservations($user->client->id);
        dd($clientReservations->toArray());
    }


}
