<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
        'user_id',
        'country',
        'state',
        'city',
        'postal_code',
        'address_line1',
        'address_line2',
    ];

    // Attributes

    protected $appends = ['added_at'];

    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    // RelationShips
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'customer_id', 'id');
    }
}
