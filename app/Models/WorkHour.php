<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WorkHour extends Model
{
    protected $fillable=['employee_id','place_id','datetime_start','datetime_end'];
    protected $dates = ['datetime_start','datetime_end'];

    use HasFactory;

    public function employee(): belongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function place(): belongsTo
    {
        return $this->belongsTo(Place::class);
    }
}
