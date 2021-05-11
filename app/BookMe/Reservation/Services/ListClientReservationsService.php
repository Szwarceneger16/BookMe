<?php

declare(strict_types=1);

namespace App\BookMe\Reservation\Services;

use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Utility\Response;
use App\DateFormatTrait;
use Carbon\Carbon;
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
        try {
            $user = auth()->user();
            $today = Carbon::now();
            $clientReservations = $this->reservationRepository->getClientReservations($user->client->id, $today);
            $clientReservationsData = $clientReservations->map(function ($reservation) {
                return [
                    'id' => $reservation->id,
                    'service' => $reservation->service->title,
                    'employee' => $reservation->employee->user->first_name . " " . $reservation->employee->user->last_name,
                    'date' => DateFormatTrait::format_Ymd_His($reservation->datetime_start),
                    'time' => $reservation->service->duration_time / 60,
                ];
            })->toArray();
            return Response::build($clientReservationsData, 200, "msg/success.list");
        } catch (Exception $exception) {
            return Response::build($exception, 400, "msg/error.list");
        }
    }


}
