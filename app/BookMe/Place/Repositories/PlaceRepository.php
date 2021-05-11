<?php

namespace App\BookMe\Place\Repositories;

use App\Models\Place;

class PlaceRepository
{

    private Place $place;

    public function __construct(Place $place)
    {
        $this->place=$place;
    }

    public function find(int $id)
    {
        return $this->place->find($id);
    }
}
