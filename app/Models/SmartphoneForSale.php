<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SmartphoneForSale extends Model
{
    protected $fillable = ['smartphone_id', 'selling_price', 'additional_fee'];

    protected $appends = ['added_at'];

    // Attributes
    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    // RelationShips
    public function smartphone(): BelongsTo
    {
        return $this->belongsTo(Smartphone::class, 'smartphone_id', 'id');
    }

    // Casting
    protected $casts = [
        'additional_fee' => 'array',
    ];
}
