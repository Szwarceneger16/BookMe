<?php


namespace App\BookMe\Reservation\Services;


use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Utility\Response;
use Carbon\Carbon;

class ListEmployeeAllReservationsInfoService
{
    protected ReservationRepository $reservationRepository;
    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function execute($request)
    {
        $now = Carbon::now();
        $employeeId = $request['employee_id'];
        $employeeReservationsInfo = $this->reservationRepository->getEmployeeReservationsInfo($employeeId, $now);
        return Response::build($employeeReservationsInfo, 200, "msg/success.list");
    }
}
