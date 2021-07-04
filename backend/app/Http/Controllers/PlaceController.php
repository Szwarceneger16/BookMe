<?php


namespace App\Http\Controllers;


use App\BookMe\Place\Request\UpdatePlaceRequest;
use App\BookMe\Place\Request\StorePlaceRequest;
use App\BookMe\Place\Services\DestroyPlaceService;
use App\BookMe\Place\Services\ListPlacesService;
use App\BookMe\Place\Services\StorePlaceService;
use App\BookMe\Place\Services\UpdatePlaceService;
use Illuminate\Http\JsonResponse;

/**
 * @group Places
 *
 * APIs for using places
 */
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

    /**
     * List places
     *
     * List every places
     * @authenticated
     * @response {
     *    "data": [
     *  {
     *   "id": 1,
     *   "name": "Salon główny"
     *   },
     *   {
     *   "id": 2,
     *   "name": "Stanowisko nr 1"
     *   },
     *    {
     *   "id": 3,
     *   "name": "stanowisko nr 2"
     *   },
     *   {
     *   "id": 4,
     *   "name": "stanowisko nr 3"
     *   },
     *    ]
     *    "message": "Data was returned",
     *    "status": 200
     *    }
     *
     */
    public function list(): JsonResponse
    {
        return $this->listPlacesService->execute();
    }

    /**
     * Store place
     *
     * Create new place object with given name
     * @bodyParam name string required Name of place. Example: Gabinet 2
     * @authenticated
     * @response {
     *    "data": "true",
     *    "message": "Data was stored",
     *    "status": 201
     *    }
     *
     */
    public function store(StorePlaceRequest $request): JsonResponse
    {
        return $this->storePlaceService->execute($request->validated());
    }

    /**
     * Delete place
     *
     * @queryParam id integer required Id of place Example: 2
     * @authenticated
     * @response {
     *    "data": "true",
     *    "message": "Data was stored",
     *    "status": 201
     *    }
     *
     */
    public function destroy($id): JsonResponse
    {
        return $this->destroyPlaceService->execute($id);
    }

    /**
     * Update place
     *
     * @queryParam id integer required Id of place Example: 2
     * @bodyParam name string required New name of object Example: Gabinet 1
     * @authenticated
     * @response {
     *    "data": "true",
     *    "message": "Data was updated",
     *    "status": 201
     *    }
     *
     */
    public function update(UpdatePlaceRequest $request, $id): JsonResponse
    {
        return $this->updatePlaceService->execute($request->validated(), $id);
    }

}
