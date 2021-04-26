<?php

declare(strict_types=1);

namespace App\BookMe\User\Services;

use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class ChangePasswordService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository=$userRepository;
    }

    public function execute($request): JsonResponse
    {
        $user=$this->userRepository->getAuthUser();
        if(isset($user))
        {
            $this->userRepository->updatePassword($user, $request);
            return Response::build([], 201, 'msg/success.update');
        }else{
            return Response::build([], 404, 'msg/error.update');
        }
    }

}
