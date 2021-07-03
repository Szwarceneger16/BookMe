<?php


namespace App\BookMe\Place\Services;


use App\BookMe\Place\Repositories\PlaceRepository;
use App\BookMe\Utility\Response;

class StorePlaceService
{
    protected PlaceRepository $placeRepository;
    public function __construct(PlaceRepository $placeRepository)
    {
        $this->placeRepository = $placeRepository;
    }

    public function execute(array $request)
    {
        try {
            $result = $this->placeRepository->create($request);
            return Response::build($result, 200, "msg/success.create");
        } catch (\Exception $exception) {
            return Response::build($exception, 400, "msg/error.create");
        }

    }
}
