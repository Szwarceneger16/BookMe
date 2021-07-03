<?php


namespace App\BookMe\User\Services\Auth;


use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;

class RefreshActionService
{
    private TokenHelper $tokenHelper;

    public function __construct(TokenHelper $tokenHelper)
    {
        $this->tokenHelper=$tokenHelper;
    }

    public function execute(): JsonResponse
    {
        $refreshToken = $this->tokenHelper->createNewToken(auth()->refresh());
        return Response::build($refreshToken, 200, 'msg/success.refresh');
    }

}
