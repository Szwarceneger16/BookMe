<?php

namespace App\BookMe\User\Enums;

class AccountType
{
    const CLIENT = 'CLIENT';
    const EMPLOYEE = 'EMPLOYEE';
    const ADMIN = 'ADMIN';

    const TYPES = [
        self::CLIENT,
        self::EMPLOYEE,
        self::ADMIN
    ];
}
