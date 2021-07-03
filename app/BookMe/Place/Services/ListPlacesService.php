<?php


namespace App\BookMe\Place\Services;


use App\BookMe\Place\Repositories\PlaceRepository;
use App\BookMe\Utility\Response;
use Exception;
use Illuminate\Http\JsonResponse;

class ListPlacesService
{
    protected PlaceRepository $placeRepository;
    public function __construct(PlaceRepository $placeRepository)
    {
        $this->placeRepository = $placeRepository;
    }

    public function execute(): JsonResponse
    {
        try {
            $result = $this->placeRepository->all(['id', 'name']);
            return Response::build($result, 200, "msg/success.list");
        } catch(Exception $exception)
        {
            return Response::build($exception, 400, "msg/error.list");
        }
    }
}
