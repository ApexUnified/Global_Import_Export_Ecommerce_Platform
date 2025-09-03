<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class MetaSetting extends Model
{
    protected $fillable = [
        'meta_app_id',
        'meta_app_secret',
        'is_active',
    ];

    // Attributes
    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    // Static Booting
    public static function booted()
    {

        static::updated(function ($meta_setting) {
            Cache::forget('meta_setting');
        });

        static::deleting(function () {
            if (static::count() === 1) {
                throw new \Exception('You cannot delete this record because at least one Meta Setting must always remain in the system.');
            }
        });

    }

    // casting
    protected $casts = [
        'meta_app_id' => 'encrypted',
        'meta_app_secret' => 'encrypted',
    ];
}
