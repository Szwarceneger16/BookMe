<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Place extends Model
{
    use HasFactory;

    protected $fillable=['id','name'];

    public function workHours(): HasMany
    {
        return $this->HasMany(WorkHour::class);
    }

    public function reservations(): HasMany
    {
        return $this->HasMany(Reservation::class);
    }
}
