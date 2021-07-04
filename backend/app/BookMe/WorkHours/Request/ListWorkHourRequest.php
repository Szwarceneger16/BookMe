<?php

namespace App\BookMe\WorkHours\Request;

use Illuminate\Foundation\Http\FormRequest;

class ListWorkHourRequest extends FormRequest
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
            'date'=>'date|required',
            'employee_id'=>'int'
        ];
    }
}
