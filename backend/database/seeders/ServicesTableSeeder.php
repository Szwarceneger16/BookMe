<?php

namespace Database\Seeders;

use App\Models\Place;
use App\Models\Service;
use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $suffix = [
            'Strzyżenie męskie' => '1500',
            'Strzyżenie damskie'=>'3600',
            'Makijaż wieczorowy'=>'7200',
            'Piercing'=>'4800',
            'Masaż'=>'2700'
        ];

        foreach($suffix as $record => $key)
        {
            Service::create([
                'title'=>$record,
                'duration_time'=>$key
            ]);
        }

        $places=['stanowisko nr 1', 'stanowisko nr 2', 'stanowisko nr 3','stanowisko nr 4','stanowisko nr 5','stanowisko nr 6'];
        foreach($places as $place)
        {
            Place::create(['name'=>$place]);
        }
    }
}
