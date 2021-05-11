<?php

namespace Database\Factories;

use App\BookMe\User\Enums\AccountType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'email' => $this->faker->unique()->safeEmail,
            'password' => '$2y$10$OWo6yTJ6Lpc3Y3m1NMkN3unijqGeQ7g1IyoqVqQUQyOGjSvoLURJ.',
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'phone' => $this->faker->phoneNumber,
            'account_type' => AccountType::EMPLOYEE
        ];
    }
}
