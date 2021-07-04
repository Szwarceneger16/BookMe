<?php

namespace App\BookMe\WorkHours\Request;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkHourRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'datetime_start' => 'required|date',
            'datetime_end' => 'required|date|after_or_equal:datetime_start',
            'employee_id' => 'required|integer',
            'place_id' => 'required|integer',
        ];
    }
}
