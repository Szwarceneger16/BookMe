<?php


namespace App\BookMe\User\Services;


use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthUserService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(): JsonResponse
    {
        $user = $this->userRepository->getAuthUser();
        if (isset($user)){
            return Response::build([
                'first_name'=>$user->first_name,
                'last_name'=>$user->last_name,
                'email'=>$user->email,
                'phone'=>$user->phone,

            ], 200, 'msg/success.update');
        }else{
            return Response::build([], 404, 'msg/error.update');
        }
    }
}
