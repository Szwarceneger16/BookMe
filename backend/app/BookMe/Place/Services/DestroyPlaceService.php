<?php


namespace App\BookMe\Place\Services;


use App\BookMe\Place\Repositories\PlaceRepository;
use App\BookMe\Utility\Response;
use Illuminate\Http\JsonResponse;

class DestroyPlaceService
{
    protected PlaceRepository $placeRepository;
    public function __construct(PlaceRepository $placeRepository)
    {
        $this->placeRepository = $placeRepository;
    }

    public function execute(int $placeId): JsonResponse
    {
        try {
            $result = $this->placeRepository->findAndDelete($placeId);
            return Response::build($result, 200, "msg/success.update");
        } catch (\Exception $exception) {
            return Response::build($exception, 400, "msg/error.update");
        }
    }

}
