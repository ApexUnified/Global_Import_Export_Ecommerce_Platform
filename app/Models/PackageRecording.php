<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PackageRecording extends Model
{
    protected $fillable = [
        'order_id',
        'package_video',
        'is_opened',
        'opened_at',
    ];

    // Attributes
    protected $appends = ['added_at'];

    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    // RelationShips
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    // Casting
    protected $casts = [
        'opened_at' => 'date:Y-m-d',
    ];
}
