<?php


namespace App\BookMe\User\Services\Auth;


use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class LoginActionService
{

    private TokenHelper $tokenHelper;

    public function __construct(TokenHelper $tokenHelper)
    {
        $this->tokenHelper=$tokenHelper;
    }

    public function execute($data): JsonResponse
    {
        if ($token = auth()->attempt($data)) {
            $newToken = $this->tokenHelper->createNewToken($token);
            return Response::build($newToken, 201, 'msg/success.login');
        } else {
            Log::error("There was problem with AuthService.loginAction(): ");
            return Response::build([], 500, 'msg/error.login');
        }
    }
}
