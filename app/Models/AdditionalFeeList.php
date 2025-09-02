<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdditionalFeeList extends Model
{
    protected $fillable = [
        'name',
        'is_active',
    ];

    protected $appends = ['added_at'];

    // Attributes
    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }
}
