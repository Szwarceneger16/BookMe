<?php


namespace App\BookMe\Reservation\Services;


use App\BookMe\Reservation\Enums\ReservationStatuses;
use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Reservation\Traits\ReservationTrait;
use App\BookMe\Utility\Response;
use App\DateFormatTrait;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;

class ListClientEveryReservationsService
{
    use ReservationTrait;

    private ReservationRepository $reservationRepository;
    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function execute(): JsonResponse
    {
        $user = auth()->user();

        try {
            $clientReservations = $this->reservationRepository->getClientEveryReservations($user->client->id);

            $clientReservationsData = $clientReservations->map(function ($reservation) {
               return $this->prepareClientEveryReservationsData($reservation);
            });

            return Response::build($clientReservationsData, 200, "msg/success.list");
        } catch (Exception $exception) {
            return Response::build($exception, 400, "msg/error.list");
        }
    }

    public function prepareClientEveryReservationsData($reservation)
    {
        $active = $reservation->reservation_status;

        if ($reservation->datetime_start < Carbon::now()) {
            $active = ReservationStatuses::UNACTIVE;
        }

        $payment = ReservationTrait::getFinalPayment($reservation);
        $payment_status = null;
        $payment ? $payment_status = $payment->payment_status : null;
        return [
            'id' => $reservation->id,
            'service' => $reservation->service->title,
            'employee' => $reservation->employee->user->first_name . " " . $reservation->employee->user->last_name,
            'date' => DateFormatTrait::format_Ymd_His($reservation->datetime_start),
            'time' => $reservation->service->duration_time / 60,
            'active' => $active,
            'payment_status' => $payment_status,
        ];
    }
}
