<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RewardPoint extends Model
{
    protected $fillable = ['user_id', 'points', 'expires_at'];

    protected $appends = ['added_at'];

    //    Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // Attributes
    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    // Casting
    protected $casts = [
        'expires_at' => 'date:Y-m-d',
    ];
}
