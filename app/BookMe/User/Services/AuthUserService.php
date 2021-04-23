<?php


namespace App\BookMe\User\Services;


use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;

class AuthUserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(){
        $user_info = $this->userRepository->getAuthUserInfo();
        if ($user_info){
            return Response::build($user_info, 200, 'msg/success.show');
        }
        return Response::build($user_info, 404, 'msg/error.show');
    }
}
