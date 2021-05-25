<?php

namespace App\BookMe\Reservation\Repositories;

use App\BookMe\Reservation\Enums\ReservationStatuses;
use App\Models\Reservation;
use Illuminate\Support\Facades\DB;

class ReservationRepository
{
    private Reservation $reservation;

    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    public function find(int $id)
    {
        return $this->reservation->find($id);
    }

    public function create(object $reservation)
    {
        return $this->reservation->create($reservation->toArray());
    }

    public function getByDate($date)
    {
        return $this->reservation->whereDate('datetime_start', $date)->get();
    }

    public function getAll()
    {
        return $this->reservation->all();
    }

    public function getAllEmployee($employeeId)
    {
        return $this->reservation
            ->where([['employee_id', $employeeId], ['reservation_status', ReservationStatuses::ACTIVE]])
            ->orderBy('datetime_start', 'ASC')
            ->get();
    }

    public function getAllEmployeeForDay($employeeId, $from, $to)
    {
        return $this->reservation
            ->where([['employee_id', $employeeId], ['reservation_status', ReservationStatuses::ACTIVE]])
            ->where(function ($query) use ($from, $to) {
                $query->where([['datetime_start', '>',$from],['datetime_start','<',$to]]);
                $query->orWhere([['datetime_end', '>',$from],['datetime_end','<',$to]]);
            })->first();
    }

    public function allReservationsCount()
    {
        return $this->reservation->all()->count();
    }

    public function getClientReservations($clientId, $from)
    {
        return $this->reservation
            ->where('client_id', $clientId)
            ->where('datetime_start', ">=", $from)
            ->where('reservation_status', ReservationStatuses::ACTIVE)
            ->get();
    }

    public function getClientEveryReservations($clientId)
    {
        return $this->reservation
            ->where('client_id', $clientId)
            ->get();
    }

    public function isClientOwnerOfReservation($reservationId, $clientId)
    {
        return $this->find($reservationId)->client->id === $clientId;
    }

    public function updateReservationStatus(object $reservation, $status)
    {
        return $reservation->update(['reservation_status' => $status]);
    }

    public function getEmployeeReservationsInfo($employeeId, $from)
    {
        $status = ReservationStatuses::ACTIVE;
        $sql = "SELECT date(date_format(reservations.datetime_start, '%Y-%m-%d')) as date, COUNT(reservations.id) AS counter
                FROM reservations
                WHERE datetime_start >= '{$from}' AND
                    employee_id = '{$employeeId}' AND
                    reservation_status = '{$status}'
                GROUP BY 1";
        return DB::select($sql);
    }
}
