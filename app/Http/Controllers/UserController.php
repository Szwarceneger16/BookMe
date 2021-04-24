<?php

namespace App\Http\Controllers;

use App\BookMe\User\Request\CheckPasswordRequest;
use App\BookMe\User\Services\AuthUserService;
use App\BookMe\User\Services\CheckPasswordService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group User
 *
 * APIs for users
 */
class UserController extends Controller
{
    protected $authUserService;
    protected $checkPasswordService;

    public function __construct(AuthUserService $authUserService,
                                CheckPasswordService $checkPasswordService)
    {
        $this->authUserService = $authUserService;
        $this->checkPasswordService = $checkPasswordService;
    }

    /**
     * Current User
     *
     * Returns data about current authenticated user
     * @authenticated
     * @response {
     *    "data": {
     *    "first_name": "Jan",
     *    "last_name": "Nowak",
     *    "email": "test@test.pl"
     *    },
     *    "message": "Record was returned",
     *    "status": 200
     *    }
     */
    public function authUser(): JsonResponse
    {
        return $this->authUserService->execute();
    }

    /**
     * Check password
     *
     * Returns data about current authenticated user
     * @bodyParam password string required Password to check. Example: 1235678
     * @authenticated
     * @response {
     *    "data": "true",
     *    "message": "Record was returned",
     *    "status": 200
     *    }
     */
    public function checkPassword(CheckPasswordRequest $request): JsonResponse
    {
        return $this->checkPasswordService->execute($request->validated());
    }
}
