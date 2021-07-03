<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotificationHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'created',
        'twenty_four_hours_before'
    ];

     public function reservation(): BelongsTo
     {
         return $this->belongsTo(Reservation::class);
     }
}
