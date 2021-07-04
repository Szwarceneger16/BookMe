<?php

namespace App\BookMe\Reservation\Request;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'datetime_start' => 'required|date',
            'datetime_end' => 'required|date|after_or_equal:datetime_start',
            'client_id' => 'required|integer',
            'employee_id' => 'required|integer',
            'place_id' => 'required|integer',
            'service_id' => 'required|integer',
        ];
    }
}
