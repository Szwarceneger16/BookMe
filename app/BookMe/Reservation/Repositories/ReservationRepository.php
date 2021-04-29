<?php

namespace App\BookMe\Reservation\Repositories;

use App\Models\Reservation;

class ReservationRepository
{
    private Reservation $reservation;

    public function __construct(Reservation $reservation)
    {
        $this->reservation=$reservation;
    }

    public function find(int $id)
    {
        return $this->reservation->find($id);
    }

    public function create(Object $reservation)
    {
        return $this->reservation->create($reservation->toArray());
    }

    public function getAll()
    {
        return $this->reservation->all();
    }

    public function allReservationsCount()
    {
        return $this->reservation->all()->count();
    }
}
