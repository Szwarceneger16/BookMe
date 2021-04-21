<?php


namespace App\BookMe\User\Services\Auth;


use App\BookMe\User\Repositories\UserRepository;

class LoginActionService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {

    }

    public function execute()
    {

    }

}
