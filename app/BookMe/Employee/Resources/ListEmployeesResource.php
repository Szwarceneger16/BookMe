<?php

namespace App\BookMe\Employee\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ListEmployeesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->user->first_name,
            'last_name' => $this->user->last_name,
        ];
    }
}
