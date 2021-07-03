<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $suffix=[
        'Masażysta',
        'Fryzjer junior',
        'Fryzjer medium',
        'Fryzjer senior',
        'Makijażystka',
        'Kosmetyczka'
    ];
        return [
            'job_title'=>Arr::random($suffix),
            'user_id'=>User::factory()->create()->id
        ];
    }
}
