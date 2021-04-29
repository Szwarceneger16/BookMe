<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WorkHour extends Model
{
    protected $dates = ['datetime_start','datetime_end'];

    use HasFactory;

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function places(): HasMany
    {
        return $this->hasMany(Place::class);
    }
}
