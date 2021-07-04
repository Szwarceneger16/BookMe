<?php


namespace App\BookMe\Payments\Request;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaymentIntentRequest extends FormRequest
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
            'reservation_id' => 'required|int',
        ];
    }
}

