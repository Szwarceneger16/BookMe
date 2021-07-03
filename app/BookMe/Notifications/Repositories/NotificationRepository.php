<?php


namespace App\BookMe\Notifications\Repositories;


use App\BookMe\Reservation\Enums\ReservationStatuses;
use App\Models\Reservation;
use Carbon\Carbon;

class NotificationRepository
{
    private Reservation $reservation;
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    public function getEveryUserWaitingReservations($client_id)
    {
        return $this->reservation->where('client_id', $client_id)
            ->where('datetime_start', '>=', Carbon::now())
            ->where('reservation_status', ReservationStatuses::ACTIVE)
            ->get();
    }

}
