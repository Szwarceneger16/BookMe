<?php


namespace App\BookMe\User\Services;


use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CheckPasswordService
{

    public function execute($data): JsonResponse
    {
        $user = Auth::user();
        if (isset($user) && Hash::check($data['password'], $user->password)){
            return Response::build(true, 200, 'msg/success.show');
        } else {
            return Response::build([], 406, 'msg/error.show');
        }
    }
}
