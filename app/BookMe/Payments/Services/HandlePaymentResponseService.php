<?php


namespace App\BookMe\Payments\Services;


use App\BookMe\Payments\Repositories\PaymentRepository;

class HandlePaymentResponseService
{
    protected PaymentRepository $paymentRepository;
    public function __construct(PaymentRepository $paymentRepository)
    {
        $this->paymentRepository = $paymentRepository;
    }

    public function execute($request)
    {
        $payment_intent = $request->query('payment_intent');
        $payment_intent_client_secret = $request->query('payment_intent_client_secret');
        $payment = $this->paymentRepository->find($payment_intent, $payment_intent_client_secret);
        if ($request->query('redirect_status') === "succeeded")
        {
            $payment->is_success = true;
            $payment->save();
            return redirect(config('client_page') . 'register/success');
        } else {
            return redirect(config('client_page') . 'register/failed');
        }
    }
}
