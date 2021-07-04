<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\BookMe\User\Request\LoginRequest;
use App\BookMe\User\Request\RegisterRequest;
use App\BookMe\User\Services\Auth\LoginActionService;
use App\BookMe\User\Services\Auth\LogoutActionService;
use App\BookMe\User\Services\Auth\RefreshActionService;
use App\BookMe\User\Services\Auth\RegisterActionService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

/**
 * @group Authentication
 *
 * APIs for authentication
 * <aside class="notice">That can be simple 😀</aside>
 */
class AuthController extends Controller
{
    private RegisterActionService $registerActionService;
    private LoginActionService $loginActionService;
    private RefreshActionService $refreshActionService;
    private LogoutActionService $logoutActionService;

    public function __construct(RegisterActionService $registerActionService,
                                LoginActionService $loginActionService,
                                RefreshActionService $refreshActionService,
                                LogoutActionService $logoutActionService
    )
    {
        $this->middleware('jwtauth', ['except' => ['login', 'register']]);
        $this->registerActionService = $registerActionService;
        $this->loginActionService = $loginActionService;
        $this->logoutActionService = $logoutActionService;
        $this->refreshActionService = $refreshActionService;
    }

    /**
     * Login
     *
     * User login action
     * @bodyParam email string required Email field. Example: test@test.com
     * @bodyParam password string required Password field. Example: 12345678
     *
     * @response 201 {
     * "data": {
     *  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYxOTEwNzAxMSwiZXhwIjoxNjE5MTEwNjExLCJuYmYiOjE2MTkxMDcwMTEsImp0aSI6IkVTS2FFU1JXNVhEenpQOWkiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.VcvuZYnspBznqEIKNHO4sLJg0zTksgXCzgofa9xepuY",
     *  "token_type": "bearer",
     *  "expires_in": 60
     * }
     *  "message": "Login success",
     *  "status": 201
     * }
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        return $this->loginActionService->execute($request->validated());
    }

    /**
     * Register
     *
     * User register action
     * @bodyParam email string required Email field Example: test@test.pl
     * @bodyParam password string required Password field. Example: 12345678
     * @bodyParam first_name string required First name field. Example: Jan
     * @bodyParam last_name string required Last name field. Example: Nowak
     * @bodyParam phone string required Password field. Example: 123 456 789
     *
     * @response 201{
     * "data": {
     * "email": "test@test.pl",
     * "first_name": "Jan",
     * "last_name": "Nowak",
     * "phone": "123 456 789",
     * "updated_at": "2021-04-22T15:52:13.000000Z",
     * "created_at": "2021-04-22T15:52:13.000000Z",
     * "id": 1
     * },
     * "message": "Records was created",
     * "status": 201
     *}
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        return $this->registerActionService->execute($request->validated());
    }

    /**
     * Logout user
     *
     * @authenticated
     *
     */
    public function logout(): JsonResponse
    {
        return $this->logoutActionService->execute();
    }

    public function refresh(): JsonResponse
    {
        return $this->refreshActionService->execute();
    }
}
