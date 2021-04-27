<?php

namespace App\Http\Controllers;

use App\BookMe\User\Request\ChangePasswordRequest;
use App\BookMe\User\Request\CheckPasswordRequest;
use App\BookMe\User\Request\UpdateDataRequest;
use App\BookMe\User\Services\AuthUserService;
use App\BookMe\User\Services\ChangePasswordService;
use App\BookMe\User\Services\CheckPasswordService;
use App\BookMe\User\Services\UpdateDataService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @group User
 *
 * APIs for users
 */
class UserController extends Controller
{
    protected AuthUserService $authUserService;
    protected CheckPasswordService $checkPasswordService;
    private ChangePasswordService $changePasswordService;
    private UpdateDataService $updateDataService;

    public function __construct(AuthUserService $authUserService,
                                CheckPasswordService $checkPasswordService,
                                UpdateDataService $updateDataService,
                                ChangePasswordService $changePasswordService)
    {
        $this->authUserService = $authUserService;
        $this->checkPasswordService = $checkPasswordService;
        $this->updateDataService = $updateDataService;
        $this->changePasswordService = $changePasswordService;
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
     *
     * @param UpdateDataRequest $request
     * @return JsonResponse
     */
    public function checkPassword(UpdateDataRequest $request): JsonResponse
    {
        return $this->checkPasswordService->execute($request->validated());
    }

    /**
     * Change password
     *
     * Change password current logged user
     * @bodyParam password string required User's current password. Example: 1235678
     * @bodyParam new_password string required User's new password. Example: 1235678
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Records was updated",
     *    "status": 201
     *    }
     *
     * @param CheckPasswordRequest $request
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        return $this->changePasswordService->execute($request->validated());
    }

    /**
     * Update phone and email
     *
     * Update phone and email current user logged
     * @bodyParam email email Email field Example: test@test.pl
     * @bodyParam phone int Phone field. Example: 12345678
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Records was updated",
     *    "status": 201
     *    }
     *
     * @param UpdateDataRequest $request
     * @return JsonResponse
     */
    public function update(UpdateDataRequest $request): JsonResponse
    {
        return $this->updateDataService->execute($request->validated());
    }


}
