<?php


namespace App\BookMe\Reservation\Enums;


class ReservationStatuses
{
    const ACTIVE = "ACTIVE";
    const UNACTIVE = "UNACTIVE";

    const TYPES = [
        self::ACTIVE,
        self::UNACTIVE,
    ];
}
