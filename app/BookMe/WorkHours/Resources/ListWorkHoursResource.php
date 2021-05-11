<?php

namespace App\BookMe\WorkHours\Resources;

use App\DateFormatTrait;
use Illuminate\Http\Resources\Json\JsonResource;

class ListWorkHoursResource extends JsonResource
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
            'work_hour_id' => $this->id,
//            'first_name' => $this->employee->user->first_name,
//            'last_name' => $this->employee->user->last_name,
            'time_start' => DateFormatTrait::format_His($this->datetime_start),
            'time_end' => DateFormatTrait::format_His($this->datetime_end),
            'place' => $this->place->name,
        ];
    }

}
