<?php


namespace App\BookMe\JobsServices\Services;


use App\BookMe\JobsServices\Repositories\ServiceRepository;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;


class ShowAllService
{
    protected ServiceRepository $serviceRepository;

    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    public function execute(): JsonResponse
    {
        $services = $this->serviceRepository->listServices();
        return Response::build($services, 200, "msg/success.list");
    }

}
