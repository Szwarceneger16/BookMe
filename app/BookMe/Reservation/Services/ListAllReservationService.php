<?php

namespace App\BookMe\Reservation\Services;

use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Reservation\Resources\ListDailyReservationsResource;
use App\BookMe\Utility\Response;
use Exception;
use Illuminate\Http\JsonResponse;

class ListAllReservationService
{
    private ReservationRepository $reservationRepository;

    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function execute(array $request): JsonResponse
    {
        try{
            $reservations=$this->reservationRepository->getByDate($request['date']);
            $result['date']=$request['date'];
            if(isset($request['employee_id']))
            {
                $employeeReservations=$reservations->where('employee_id',$request['employee_id']);

                $result['reservations']=ListDailyReservationsResource::collection($employeeReservations);
                return Response::build($result, 200, "msg/success.list");
            }
            $result['reservations']=ListDailyReservationsResource::collection($reservations);
            return Response::build($result, 200, "msg/success.list");
        }catch(Exception $exception){
            return Response::build($exception, 400, "msg/error.list");
        }
    }
}
