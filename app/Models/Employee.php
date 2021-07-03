<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable=['job_title'];

    protected $dates = ['deleted_at'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot() {
        parent::boot();
        static::deleted(function ($employee) {
            $employee->user()->delete();
        });
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class,'employees_services')->withPivot('service_id');
    }

    public function workHours(): HasMany
    {
        return $this->HasMany(WorkHour::class);
    }

    public function reservations(): HasMany
    {
        return $this->HasMany(Reservation::class);
    }


}
