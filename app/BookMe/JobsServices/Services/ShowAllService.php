<?php


namespace App\BookMe\JobsServices\Services;


use App\BookMe\JobsServices\Repositories\JobsServicesRepository;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;


class ShowAllService
{
    protected $jobsServicesRepository;

    public function __construct(JobsServicesRepository $jobsServicesRepository)
    {
        $this->jobsServicesRepository = $jobsServicesRepository;
    }

    public function execute(): JsonResponse
    {
        $services = $this->jobsServicesRepository->listServices();
        return Response::build($services, 200, "msg/success.list");
    }

}
