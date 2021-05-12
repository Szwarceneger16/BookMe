<?php


namespace App\BookMe\Reservation\Traits;


use App\BookMe\Payments\Enums\PaymentStatuses;
use App\Models\Reservation;



trait ReservationTrait
{
    public static function getFinalPayment(Reservation $reservation)
    {
        $payment = null;
        $payments = $reservation->payments;
        foreach ($payments as $clientPayment) {
            if ($clientPayment->payment_status == PaymentStatuses::SUCCEEDED ||
                $clientPayment->payment_status == PaymentStatuses::REFUNDED) {
                $payment = $clientPayment;
                break;
            } else {
                $payment = $clientPayment;
            }
        }
        return $payment;
    }
}
