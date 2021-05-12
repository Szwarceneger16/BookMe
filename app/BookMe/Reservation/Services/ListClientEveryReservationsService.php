<?php


namespace App\BookMe\Reservation\Services;


use App\BookMe\Payments\Enums\PaymentStatuses;
use App\BookMe\Reservation\Enums\ReservationStatuses;
use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Utility\Response;
use App\DateFormatTrait;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class ListClientEveryReservationsService
{
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
                $active = $reservation->reservation_status;
                if ($reservation->datetime_start < Carbon::now()) {
                    $active = ReservationStatuses::UNACTIVE;
                }

                $payment = null;
                $payments = $reservation->payments;
                foreach ($payments as $clientPayment) {
                    if ($clientPayment->payment_status != PaymentStatuses::SUCCEEDED ||
                        $clientPayment->payment_status == PaymentStatuses::REFUNDED) {
                        $payment = $clientPayment->payment_status;
                        break;
                    } else {
                        $payment = $clientPayment->payment_status;
                    }
                }

                return [
                    'id' => $reservation->id,
                    'service' => $reservation->service->title,
                    'employee' => $reservation->employee->user->first_name . " " . $reservation->employee->user->last_name,
                    'date' => DateFormatTrait::format_Ymd_His($reservation->datetime_start),
                    'time' => $reservation->service->duration_time / 60,
                    'active' => $active,
                    'payment_status' => $payment,
                ];
            })->toArray();
            return Response::build($clientReservationsData, 200, "msg/success.list");
        } catch (Exception $exception) {
            return Response::build($exception, 400, "msg/error.list");
        }
    }
}
