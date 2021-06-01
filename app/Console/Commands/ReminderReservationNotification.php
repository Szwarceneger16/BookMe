<?php

namespace App\Console\Commands;

use App\BookMe\Reservation\Repositories\ReservationRepository;
use App\BookMe\Reservation\Resources\NewReservationMailResource;
use App\Mail\NewReservationStoredMail;
use App\Mail\ReminderBeforeVisitMail;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Vonage\Client;
use Vonage\Client\Credentials\Basic;
use Vonage\SMS\Message\SMS;
use function config;

class ReminderReservationNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reminder-reservation-notification:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reminder before visit';
    /**
     * @var ReservationRepository
     */
    private ReservationRepository $reservationRepository;

    /**
     * Create a new command instance.
     *
     * @param ReservationRepository $reservationRepository
     */
    public function __construct(ReservationRepository $reservationRepository)
    {
        parent::__construct();
        $this->reservationRepository = $reservationRepository;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $date = Carbon::now()->addDays(1);
        $reservations = $this->reservationRepository->getAllAfterDate($date);
        foreach ($reservations as $reservation) {
            if ($reservation->notificationHistory->twenty_four_hours_before == true) {
                continue;
            };
            $dataMailReservation = new NewReservationMailResource($reservation);
            $reservationResource = $dataMailReservation->toArray($dataMailReservation);

            Mail::to($reservationResource['email'])->send(new ReminderBeforeVisitMail($reservationResource));

            $basic = new Basic(config('notification.sms_key'), config('notification.sms_secret'));
            $client = new Client($basic);
            $client->sms()->send(
                new SMS('48' . $reservationResource['phone'], 'BookMe', "Przypominamy o wizycie (" . $reservationResource['service'] . ") w dniu " . $reservationResource['datetime_start'] . ". Dziękujemy, BookMe \n\n .")
            );

            $reservation->notificationHistory->twenty_four_hours_before = true;
            $reservation->notificationHistory->update();
        }
    }
}
