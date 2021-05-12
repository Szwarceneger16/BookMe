<?php


namespace App\BookMe\User\Services\Auth;


use App\BookMe\User\Enums\AccountType;
use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class LoginActionService
{

    private TokenHelper $tokenHelper;
    protected UserRepository $userRepository;

    public function __construct(TokenHelper $tokenHelper,
                                UserRepository $userRepository)
    {
        $this->tokenHelper = $tokenHelper;
        $this->userRepository = $userRepository;
    }

    public function execute($data): JsonResponse
    {
        if ($token = auth()->attempt($data)) {
            $newToken = $this->tokenHelper->createNewToken($token);
            $user = auth()->user();

            if ($user->account_type == AccountType::CLIENT) {
                $user = $this->userRepository->getUserWithClient($user);

            } elseif ($user->account_type == (AccountType::ADMIN || AccountType::EMPLOYEE)) {
                $user=$user->toArray();
            }
            return Response::build(array_merge($newToken, $user), 201, 'msg/success.login');
        } else {
            Log::error("There was problem with AuthService.loginAction(): ");
            return Response::build([], 500, 'msg/error.login');
        }
    }
}
