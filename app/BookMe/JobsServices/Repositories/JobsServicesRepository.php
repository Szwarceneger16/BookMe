<?php


namespace App\BookMe\JobsServices\Repositories;


use App\Models\Service;

class JobsServicesRepository
{
    protected $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    public function listServices()
    {
        return $this->service->all(['id', 'title']);
    }

}
