<?php


namespace App\BookMe\User\Services\Auth;


class TokenHelper
{
    public function createNewToken($token): array
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL(),
        ];
    }
}
