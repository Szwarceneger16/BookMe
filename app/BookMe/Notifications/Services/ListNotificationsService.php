<?php


namespace App\BookMe\Notifications\Services;


use App\BookMe\Notifications\Repositories\NotificationRepository;
use App\BookMe\Utility\Response;
use Carbon\Carbon;
use Exception;

class ListNotificationsService
{
    protected NotificationRepository $notificationRepository;
    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    public function execute()
    {
        try{
            $user = auth()->user();
            if ($user->client->id){
                $reservations = $this->notificationRepository->getEveryUserWaitingReservations($user->client->id);

                $result = array();
                $result['counter'] = $reservations->count();
                $result['reservations'] = $reservations->map(function ($reservation) {
                    return $this->prepareReservationData($reservation);
                });
                return Response::build($result, 200, "msg/success.list");
            }
            return Response::build(["error" => "This is only for client"], 400, "msg/error.list");
        }catch(Exception $exception){
            return Response::build($exception, 400, "msg/error.list");
        }
    }

    public function prepareReservationData($reservation)
    {

        $date = new Carbon($reservation->datetime_start);
        $date->locale('pl');
        return [
            'title' => $reservation->service->title,
            'time_left' => $date->diffForHumans(),
        ];
    }
}
