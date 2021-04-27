<?php

namespace App\BookMe\User\Repositories;

use App\Models\Client;

class ClientRepository
{
    private Client $client;

    public function __construct(Client $client)
    {
        $this->client=$client;
    }

    public function find(int $id)
    {
        return $this->client->find($id);
    }

}
