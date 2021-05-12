<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'service_id',
        'reservation_status',
    ];

    protected $dates = ['datetime_start','datetime_end'];


    public function employee(): belongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function place(): belongsTo
    {
        return $this->belongsTo(Place::class);
    }

    public function service(): belongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function client(): belongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
