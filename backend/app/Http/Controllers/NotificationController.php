<?php

namespace App\Http\Controllers;

use App\BookMe\Notifications\Services\ListNotificationsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    protected ListNotificationsService $listNotificationsService;
    public function __construct(ListNotificationsService $listNotificationsService)
    {
        $this->listNotificationsService = $listNotificationsService;
    }

    public function list(): JsonResponse
    {
        return $this->listNotificationsService->execute();
    }
}
