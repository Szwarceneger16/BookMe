<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\BookMe\User\Request\LoginRequest;
use App\BookMe\User\Services\Auth\LoginActionService;
use App\BookMe\User\Services\Auth\LogoutActionService;
use App\BookMe\User\Services\Auth\RefreshActionService;
use App\BookMe\User\Services\Auth\RegisterActionService;
use App\Http\Controllers\Controller;
use App\BookMe\User\Request\RegisterRequest;
use Illuminate\Http\JsonResponse;

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

    public function login(LoginRequest $request): JsonResponse
    {
        return $this->loginActionService->execute($request->validated());
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        return $this->registerActionService->execute($request->validated());
    }

    public function logout(): JsonResponse
    {
        return $this->logoutActionService->execute();
    }

    public function refresh(): JsonResponse
    {
        return $this->refreshActionService->execute();
    }
}
