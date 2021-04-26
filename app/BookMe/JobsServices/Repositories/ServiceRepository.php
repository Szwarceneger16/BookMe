<?php


namespace App\BookMe\JobsServices\Repositories;


use App\Models\Service;

class ServiceRepository
{
    protected Service $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    public function listServices()
    {
        return $this->service->all(['id', 'title']);
    }

}
