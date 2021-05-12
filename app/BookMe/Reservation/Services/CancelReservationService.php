<?php

declare(strict_types=1);

namespace App\BookMe\Reservation\Services;


use App\BookMe\Payments\Enums\PaymentStatuses;
use App\BookMe\Reservation\Enums\ReservationStatuses;
use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Utility\Response;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Stripe\Refund;
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
        $reservation_id = (int) $request['reservation_id'];
        $reservation = $this->reservationRepository->find($reservation_id);

//        if($reservation->datetime_start < Carbon::now()->addDay()){
//            return Response::build(["error" => "You can't cancel reservation one day before start date", "type" => "Day before"], 400, 'msg/error.update');
//        }
        $isOwner = $this->reservationRepository->isClientOwnerOfReservation($reservation_id, $user->client->id);
        if ($isOwner){
            $payment = $this->isReservationPaid($reservation_id);
            if ($payment){
                Refund::create([
                    'payment_intent' => $payment->payment_intent,
                ]);
                $payment->payment_status = PaymentStatuses::REFUNDED;
                $payment->save();
            }
            $reservation->reservation_status = ReservationStatuses::UNACTIVE;
            $reservation->save();
            return Response::build(true, 200, 'msg/success.update');
        }
        return Response::build(["error" => "Only owner of reservation can cancel it"], 400, 'msg/error.update');
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
