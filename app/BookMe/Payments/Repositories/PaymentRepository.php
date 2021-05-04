<?php


namespace App\BookMe\Payments\Repositories;


use App\Models\Payment;

class PaymentRepository
{
    protected Payment $payment;
    public function __construct(Payment $payment)
    {
        $this->payment=$payment;
    }

    public function create(Object $payment)
    {
        return $this->payment->create($payment->toArray());
    }

    public function find($payment_intent, $payment_intent_client_secret)
    {
        return $this->payment->where('payment_intent' , $payment_intent)
            ->where('payment_intent_client_secret', $payment_intent_client_secret)
            ->first();
    }
}
