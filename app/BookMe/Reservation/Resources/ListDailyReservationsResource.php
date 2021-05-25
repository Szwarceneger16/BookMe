<?php

namespace App\BookMe\Reservation\Resources;

use App\DateFormatTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class ListDailyReservationsResource extends JsonResource
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
            'reservation_id' => $this->id,
            'reservation_status' => $this->reservation_status,
            'client_id' => $this->client->id,
            'client_first_name' => $this->client->user->first_name,
            'client_last_name' => $this->client->user->last_name,
            'time_start' => DateFormatTrait::format_His($this->datetime_start),
            'time_end' => DateFormatTrait::format_His($this->datetime_end),
            'employee_id' => $this->client->id,
            'service' => $this->service->title,
            'employee_first_name' => $this->employee->user->first_name,
            'employee_last_name' => $this->employee->user->last_name,
        ];
    }
}
