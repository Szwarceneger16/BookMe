<?php


namespace App\BookMe\Payments\Enums;


class PaymentStatuses
{
    const CANCELED = "CANCELED";
    const REFUNDED = "REFFUNDED";
    const SUCCEEDED = "SUCCEEDED";
    const INCOMPLETE = "INCOMPLETE";

    const TYPES = [
        self::CANCELED,
        self::REFUNDED,
        self::SUCCEEDED,
        self::INCOMPLETE,
    ];

}
