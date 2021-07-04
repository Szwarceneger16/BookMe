<?php

namespace App\BookMe\Reservation\Request;

use Illuminate\Foundation\Http\FormRequest;

class ListAvailableReservationRequest extends FormRequest
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
            'employee_id' => 'required|integer',
            'service_id' => 'required|integer'
        ];
    }
}
