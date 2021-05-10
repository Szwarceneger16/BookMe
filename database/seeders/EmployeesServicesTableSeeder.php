<?php

namespace Database\Seeders;

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

        Employee::all()->each(function ($employee) use ($services) {
            $employee->services()->attach(
                $services->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
