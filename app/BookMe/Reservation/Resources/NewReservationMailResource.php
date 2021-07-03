<?php

namespace App\BookMe\Reservation\Resources;

use App\DateFormatTrait;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class NewReservationMailResource extends JsonResource
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
            'datetime_start'=>Carbon::parse($this->datetime_start)->format('Y-m-d H:i:s'),
            'datetime_end'=>Carbon::parse($this->datetime_end)->format('Y-m-d H:i:s'),
            'service'=>$this->service->title,
            'employee'=>$this->employee->user->first_name . ' ' . $this->employee->user->last_name,
            'client' => $this->client->user->first_name,
            'phone' => $this->client->user->phone,
            'email' =>  $this->client->user->email
        ];
    }
}
