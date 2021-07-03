<?php

declare(strict_types=1);

namespace App\BookMe\Reservation\Services;

use App\BookMe\JobsServices\Repositories\ServiceRepository;
use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Reservation\Resources\NewReservationMailResource;
use App\BookMe\Utility\Response;
use App\Mail\NewReservationStoredMail;
use App\Mail\ReminderBeforeVisitMail;
use App\Models\NotificationHistory;
use App\Models\Reservation;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Vonage\Client;
use Vonage\Client\Credentials\Basic;
use Vonage\SMS\Message\SMS;

class StoreReservationService
{
    private ReservationRepository $reservationRepository;

    public function __construct(ReservationRepository $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function execute(array $request): JsonResponse
    {
        try {
            if (auth()->user() == null) {
                return Response::build(["message" => "Unauthorized"], 401, "msg/error.store");
            }

            $availability = $this->checkAvailabilityReservation($request);
            if (!is_null($availability)) {
                return Response::build(["message" => "This term is not available"], 400, "msg/error.store");
            }
            $reservation = $this->prepareReservationObject($request);
            $reservation = $this->reservationRepository->create($reservation);

            $notificationHistory = new NotificationHistory;
            $reservation->notificationHistory()->save($notificationHistory);

            $reservationResource = $this->prepareReservationResource($reservation);
            $this->sendMail($reservationResource);
            $this->sendSMS($reservationResource);

            return Response::build($reservation, 201, "msg/success.store");
        } catch (Exception $exception) {
            return Response::build($exception, 400, "msg/error.store");
        }
    }

    private function prepareReservationResource(Reservation $reservation): array
    {
        $dataMailReservation = new NewReservationMailResource($reservation);
        return $dataMailReservation->toArray($dataMailReservation);
    }

    private function sendMail($reservation):void
    {
        Mail::to($reservation['email'])->send(new NewReservationStoredMail($reservation));
    }

    private function sendSMS($reservation):void
    {
        $basic = new Basic(config('notification.sms_key'), config('notification.sms_secret'));
        $client = new Client($basic);
        $client->sms()->send(
            new SMS('48' . $reservation['phone'], 'BookMe', "Twoja wizyta (" . $reservation['service'] . ") odbędzie się w dniu " . $reservation['datetime_start'] . ". Dziękujemy, BookMe \n\n .")
        );
    }

    private function checkAvailabilityReservation(array $request)
    {
        return $this->reservationRepository->getAllEmployeeForDay(
            $request['employee_id'],
            (Carbon::parse($request['datetime_start'])),
            (Carbon::parse($request['datetime_end']))
        );
    }

    private function prepareReservationObject(array $request): Reservation
    {
        $reservation = new Reservation();
        $reservation->datetime_start = $request['datetime_start'];
        $reservation->datetime_end = $request['datetime_end'];
        $reservation->client_id = $request['client_id'];
        $reservation->employee_id = $request['employee_id'];
        $reservation->place_id = $request['place_id'];
        $reservation->service_id = $request['service_id'];
        return $reservation;
    }
}
