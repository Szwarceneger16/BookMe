<?php


namespace App\BookMe\User\Services\Auth;


use App\BookMe\User\Enums\AccountType;
use App\BookMe\User\Repositories\UserRepository;
use App\BookMe\Utility\Response;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class RegisterActionService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository=$userRepository;
    }

    public function execute($data): JsonResponse
    {
        try {
            $user = $this->userRepository->addUser(array_merge(
                $data,
                ['password' => Hash::make($data['password'])]
            ));
            if ($user->account_type == AccountType::CLIENT){
                $user = $this->userRepository->getUserWithClient($user);
            }
            return Response::build($user
                , 201, 'msg/success.create');
        } catch (\Exception $e) {
            Log::error("There was problem with AuthService.registerAction(): ", ['error' => $e]);
            return Response::build([], 500, 'msg/error.create');
        }
    }
}
