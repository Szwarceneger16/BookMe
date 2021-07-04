<?php


namespace App\BookMe\Employee\Services;


use App\BookMe\Employee\Resources\ListEmployeesResource;
use App\BookMe\JobsServices\Repositories\ServiceRepository;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;

class ListEmployeesByServiceService
{
    private ServiceRepository $serviceRepository;

    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    public function execute(array $request): JsonResponse
    {
        $service = $this->serviceRepository->find($request['service_id']);
        $employeesByService=$service->employees()->get();
        $employeesMapped = ListEmployeesResource::collection($employeesByService);
        return Response::build($employeesMapped, 200, "msg/success.list");
    }

}
