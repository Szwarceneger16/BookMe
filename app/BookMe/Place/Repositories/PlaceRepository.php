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

    public function all(array $params)
    {
        return $this->place->all($params);
    }

    public function create(array $place)
    {
        return $this->place->create($place);
    }

    public function findAndDelete(int $id)
    {
        return $this->find($id)->delete();
    }

    public function findAndUpdate(int $id, array $params)
    {
        return $this->find($id)->update($params);
    }
}
