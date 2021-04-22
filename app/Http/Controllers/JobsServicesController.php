<?php

namespace App\Http\Controllers;

use App\BookMe\JobsServices\Services\ShowAllService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Psy\Util\Json;


/**
 * @group Services
 *
 * APIs for services
 */
class JobsServicesController extends Controller
{
    public $showAllService;

    public function __construct(ShowAllService $showAllService)
    {
        $this->showAllService = $showAllService;
    }

    /**
     * All Services
     *
     * Returns every service used in company
     */
    public function index(): JsonResponse
    {
        return $this->showAllService->execute();
    }

}
