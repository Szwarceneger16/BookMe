<?php


namespace App\BookMe\User\Services;


use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;

class UserDashboardInfoService
{
    protected UserRepository $userRepository;
    protected ReservationRepository $reservationRepository;
    public function __construct(UserRepository $userRepository,
                                ReservationRepository $reservationRepository)
    {
        $this->userRepository = $userRepository;
        $this->reservationRepository = $reservationRepository;
    }

    public function execute()
    {
        $user=$this->userRepository->getAuthUser();
        if(isset($user))
        {
            $userReservationsCount = $this->userRepository->userReservationsCount($user);
            $allReservationsCount = $this->reservationRepository->allReservationsCount();
            return Response::build([
                "user_reservations_count" => $userReservationsCount,
                "all_reservations_count" => $allReservationsCount,
            ], 201, 'msg/success.show');
        }else{
            return Response::build([], 404, 'msg/error.show');
        }
    }
}
