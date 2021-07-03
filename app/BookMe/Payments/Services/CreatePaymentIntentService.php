<?php


namespace App\BookMe\Payments\Services;


use App\BookMe\Payments\Repositories\PaymentRepository;
use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;
use App\Models\Payment;
use Stripe\PaymentIntent;
use Stripe\Stripe;

Stripe::setApiKey(config('stripe.secret_key'));

class CreatePaymentIntentService
{
    protected UserRepository $userRepository;
    protected PaymentRepository $paymentRepository;
    public function __construct(UserRepository $userRepository,
                                PaymentRepository $paymentRepository)
    {
        $this->paymentRepository = $paymentRepository;
        $this->userRepository = $userRepository;
    }

    public function execute($request)
    {
        try {
            $intent = PaymentIntent::create([
                'amount' => 1000,
                'currency' => 'pln',
                'payment_method_types' => ['p24'],
            ]);
            $paymentData = [
                'reservation_id' => $request['reservation_id'],
                'payment_intent' => $intent['id'],
                'payment_intent_client_secret' => $intent['client_secret'],
            ];
            $payment = $this->preparePaymentObject($paymentData);
            $payment = $this->paymentRepository->create($payment);
            return Response::build(["client_secret" => $payment->payment_intent_client_secret], 201, 'msg/success.create');
        }
        catch(Exception $exception)
        {
            return Response::build($exception, 400, "msg/error.create");
        }
    }

    public function preparePaymentObject(array $paymentData): Payment
    {
        $payment = new Payment();
        $payment->payment_intent = $paymentData['payment_intent'];
        $payment->payment_intent_client_secret = $paymentData['payment_intent_client_secret'];
        $payment->reservation_id = $paymentData['reservation_id'];
        return $payment;
    }
}
