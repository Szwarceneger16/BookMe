<?php


namespace App\BookMe\User\Services;


use App\BookMe\User\Enums\AccountType;
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
        if ($user->account_type == AccountType::CLIENT){
            $user = $this->userRepository->getUserWithClient($user);
        }
        if (isset($user)){
            return Response::build($user, 200, 'msg/success.show');
        }else{
            return Response::build([], 401, 'msg/error.show');
        }
    }
}
