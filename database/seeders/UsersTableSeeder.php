<?php

namespace Database\Seeders;

use App\BookMe\User\Enums\AccountType;
use App\Models\Bookable;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $user=[
            'email' => 'kowalski@gmail.com',
            'password' => '$2y$10$OWo6yTJ6Lpc3Y3m1NMkN3unijqGeQ7g1IyoqVqQUQyOGjSvoLURJ.',
            'first_name' => 'Jan',
            'last_name' => 'Kowalski',
            'phone' => '123 123 123',
            'account_type' => AccountType::ADMIN
        ];
        Employee::create([
            'job_title'=>'Recepcjonista',
            'user_id'=>User::create($user)->id
        ]);

        $user=[
            'email' => 'nowak@gmail.com',
            'password' => '$2y$10$OWo6yTJ6Lpc3Y3m1NMkN3unijqGeQ7g1IyoqVqQUQyOGjSvoLURJ.',
            'first_name' => 'Kuba',
            'last_name' => 'Nowak',
            'phone' => '123 123 123',
            'account_type' => AccountType::EMPLOYEE
        ];
        Employee::create([
            'job_title'=>'Fryzjer',
            'user_id'=>User::create($user)->id
        ]);
        Employee::factory(5)->create();
    }
}
