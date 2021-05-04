<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable=[
        'datetime_start',
        'datetime_end',
        'client_id',
        'employee_id',
        'place_id',
        'service_id'
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function places(): HasMany
    {
        return $this->hasMany(Place::class);
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
