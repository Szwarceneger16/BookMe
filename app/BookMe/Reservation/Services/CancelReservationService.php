<?php

declare(strict_types=1);

namespace App\BookMe\Reservation\Services;


use App\BookMe\Payments\Enums\PaymentStatuses;
use App\BookMe\Reservation\Repositories\ReservationRepository;
use Illuminate\Http\JsonResponse;
use Stripe\Stripe;

Stripe::setApiKey(config('stripe.secret_key'));

class CancelReservationService
{
    private ReservationRepository $reservationRepository;
    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function execute(array $request): JsonResponse
    {
        $user = auth()->user();
        $reservation_id = $request['reservation_id'];

        if ($this->reservationRepository->isClientOwnerOfReservation($reservation_id, $user->client->id)){
            $payment = $this->isReservationPaid($reservation_id);
            if ($payment){

            }
        }
    }

    public function isReservationPaid($reservation_id)
    {
        $reservation = $this->reservationRepository->find($reservation_id);
        $payments = $reservation->payments;
        foreach ($payments as $payment){
            if ($payment->payment_status === PaymentStatuses::SUCCEEDED){
                return $payment;
            }
        }
        return null;
    }

}
