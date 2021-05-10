<?php

namespace App\Http\Controllers;

use App\BookMe\Payments\Request\CreatePaymentIntentRequest;
use App\BookMe\Payments\Services\CreatePaymentIntentService;
use App\BookMe\Payments\Services\HandlePaymentResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group Payments
 *
 * APIs for using payments
 */
class PaymentController extends Controller
{
    protected CreatePaymentIntentService $createPaymentIntentService;
    protected HandlePaymentResponseService $handlePaymentResponseService;
    public function __construct(CreatePaymentIntentService $createPaymentIntentService,
                                HandlePaymentResponseService $handlePaymentResponseService)
    {
        $this->createPaymentIntentService = $createPaymentIntentService;
        $this->handlePaymentResponseService = $handlePaymentResponseService;
    }

    /**
     * Create Payment Intent
     *
     * Create Payment Intent and link payment to reservation
     * @bodyParam reservation_id integer required Current reservation id. Example: 1
     * @authenticated
     * @response {
     *    "data": {
     *          "client_secret": "pi_123dsdsvsfdsfds",
     *      },
     *    "message": "Records was showed",
     *    "status": 201
     *    }
     *
     */
    public function createPaymentIntent(CreatePaymentIntentRequest $request): JsonResponse
    {
        return $this->createPaymentIntentService->execute($request);
    }

    /**
     * Handle response
     *
     * Handling and store data returning from stripe
     * @queryParam payment_intent string
     * @queryParam payment_intent_client_secret string
     * @queryParam redirect_status string
     */
    public function handlePaymentResponse(Request $request)
    {
        return $this->handlePaymentResponseService->execute($request);
    }
}
