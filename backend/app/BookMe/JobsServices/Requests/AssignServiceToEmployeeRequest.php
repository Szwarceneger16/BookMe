<?php

namespace App\BookMe\JobsServices\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignServiceToEmployeeRequest extends FormRequest
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
            'employee_id' => 'required|exists:employees,id',
            'services.*' => 'integer|exists:services,id',
        ];
    }
}
