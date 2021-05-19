<?php


namespace App\Http\Controllers;


use App\BookMe\Place\Request\UpdatePlaceRequest;
use App\BookMe\Place\Request\StorePlaceRequest;
use App\BookMe\Place\Services\DestroyPlaceService;
use App\BookMe\Place\Services\ListPlacesService;
use App\BookMe\Place\Services\StorePlaceService;
use App\BookMe\Place\Services\UpdatePlaceService;
use Illuminate\Http\JsonResponse;

class PlaceController
{
    private ListPlacesService $listPlacesService;
    private StorePlaceService $storePlaceService;
    private DestroyPlaceService $destroyPlaceService;
    private UpdatePlaceService $updatePlaceService;
    public function __construct(ListPlacesService $listPlacesService,
                                StorePlaceService $storePlaceService,
                                DestroyPlaceService $destroyPlaceService,
                                UpdatePlaceService $updatePlaceService)
    {
        $this->listPlacesService = $listPlacesService;
        $this->storePlaceService = $storePlaceService;
        $this->destroyPlaceService = $destroyPlaceService;
        $this->updatePlaceService = $updatePlaceService;
    }

    public function list(): JsonResponse
    {
        return $this->listPlacesService->execute();
    }

    public function store(StorePlaceRequest $request): JsonResponse
    {
        return $this->storePlaceService->execute($request->validated());
    }

    public function destroy($id): JsonResponse
    {
        return $this->destroyPlaceService->execute($id);
    }

    public function update(UpdatePlaceRequest $request, $id): JsonResponse
    {
        return $this->updatePlaceService->execute($request->validated(), $id);
    }

}
