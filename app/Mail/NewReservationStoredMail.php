<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewReservationStoredMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $reservationDetails;

    /**
     * Create a new message instance.
     *
     * @param $reservationDetails
     */
    public function __construct($reservationDetails)
    {
        $this->reservationDetails = $reservationDetails;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): NewReservationStoredMail
    {
        return $this->markdown('emails.new_reservation')
            ->with([
                'reservation' => $this->reservationDetails
            ]);
    }
}
