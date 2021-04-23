<?php

namespace App\Http\Controllers;

use App\BookMe\User\Services\AuthUserService;
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

    public function __construct(AuthUserService $authUserService)
    {
        $this->authUserService = $authUserService;
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
    public function authUser(): JsonResponse{
        return $this->authUserService->execute();
    }

}
