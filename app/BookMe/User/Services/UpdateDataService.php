<?php


namespace App\BookMe\User\Services;


use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;

class UpdateDataService
{

    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository=$userRepository;
    }

    public function execute($request): \Illuminate\Http\JsonResponse
    {
        $user=$this->userRepository->getAuthUser();
        if(isset($user))
        {
            $this->userRepository->updateData($user, $request);
            return Response::build([], 201, 'msg/success.update');
        }else{
            return Response::build([], 404, 'msg/error.update');
        }

    }

}
