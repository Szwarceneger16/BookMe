<?php

namespace App\BookMe\WorkHours\Services;

use App\BookMe\Utility\Response;
use App\BookMe\WorkHours\Repositories\WorkHoursRepository;
use Illuminate\Http\JsonResponse;

class ListWorkHourService
{
    private WorkHoursRepository $workHoursRepository;

    public function __construct(WorkHoursRepository $workHoursRepository)
    {
        $this->workHoursRepository = $workHoursRepository;
    }

    public function execute(array $request): JsonResponse
    {
        dd($request);
        return Response::build($request, 200, "msg/success.list");
    }
}
