<?php

namespace App\Http\Controllers;

use App\BookMe\JobsServices\Services\ShowAllService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Psy\Util\Json;


/**
 * @group Services
 *
 * APIs for services
 */
class JobsServicesController extends Controller
{
    public ShowAllService $showAllService;

    public function __construct(ShowAllService $showAllService)
    {
        $this->showAllService = $showAllService;
    }

    /**
     * List all Services
     *
     * List all Services
     * @authenticated
     * @response {
     *    "data": "[]",
     *    "message": "Data was returned",
     *    "status": 200
     *    }
     */
    public function index(): JsonResponse
    {
        return $this->showAllService->execute();
    }

}
