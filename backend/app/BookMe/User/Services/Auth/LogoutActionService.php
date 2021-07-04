<?php


namespace App\BookMe\User\Services\Auth;


use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;

class LogoutActionService
{
    public function execute(): JsonResponse
    {
        auth()->logout();
        return Response::build([], 200, 'msg/success.logout');
    }
}
