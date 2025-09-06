<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class GoogleMapSetting extends Model
{
    protected $fillable = ['google_map_api_key', 'google_map_id', 'is_active'];

    // Attributes
    protected $appends = ['added_at'];

    public function getAddedAtAttribute()
    {
        return ! empty($this->created_at) ? $this->created_at->format('Y-m-d') : null;
    }

    // Static Booting
    public static function booted()
    {

        static::updated(function ($google_map_setting) {
            Cache::forget('google_map_setting');
        });

        static::deleting(function () {
            if (static::count() === 1) {
                throw new \Exception('You cannot delete this record because at least one Google Map Setting must always remain in the system.');
            }
        });

    }

    // casting
    protected $casts = [
        'google_map_api_key' => 'encrypted',
        'google_map_id' => 'encrypted',
    ];
}
