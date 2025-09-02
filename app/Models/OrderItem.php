<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id', 'smartphone_id', 'product_id', 'quantity', 'unit_price', 'sub_total',
    ];

    //   Attributes
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

    public function smartphone(): BelongsTo
    {
        return $this->belongsTo(Smartphone::class, 'smartphone_id', 'id');
    }
}
