<?php

declare(strict_types=1);

namespace App\BookMe\Reservation\Services;

use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Reservation\Resources\ListClientActiveReservationsResource;
use App\BookMe\Reservation\Traits\ReservationTrait;
use App\BookMe\Utility\Response;
use App\DateFormatTrait;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;

class ListClientActiveReservationsService
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
                return $this->prepareClientReservationsData($reservation);
            });
            return Response::build($clientReservationsData, 200, "msg/success.list");
        } catch (Exception $exception) {
            return Response::build($exception, 400, "msg/error.list");
        }
    }

    private function prepareClientReservationsData($reservation)
    {
        $payment = ReservationTrait::getFinalPayment($reservation);
        $payment_status = null;
        $payment ? $payment_status = $payment->payment_status : null;
        return [
            'id' => $reservation->id,
            'service' => $reservation->service->title,
            'employee' => $reservation->employee->user->first_name . " " . $reservation->employee->user->last_name,
            'date' => DateFormatTrait::format_Ymd_His($reservation->datetime_start),
            'time' => $reservation->service->duration_time / 60,
            'payment_status' => $payment_status,
        ];
    }

}
