<?php

namespace Database\Seeders;

use App\BookMe\User\Enums\AccountType;
use App\Models\Employee;
use App\Models\Service;
use Illuminate\Database\Seeder;

class EmployeesServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services = Service::all();

        Employee::with(['user' => function ($q) {
            $q->where('account_type',AccountType::ADMIN);
        }])->get()->each(function ($employee) use ($services) {
            $employee->services()->attach(
                $services->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
