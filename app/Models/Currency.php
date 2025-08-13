<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Currency extends Model
{
    protected $fillable = [
        'name',
        'symbol',
        'is_active',
    ];

    protected $appends = ['added_at'];

    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    // Static booted
    public static function booted()
    {
        static::created(function () {
            Cache::forget('currencies');
        });

        static::updated(function () {
            Cache::forget('currencies');
        });
    }
}
