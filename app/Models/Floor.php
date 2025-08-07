<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Floor extends Model
{
    protected $fillable = ['name'];

    protected $appends = ['added_at'];

    // Attributes
    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    // RelationShips
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'floor_id', 'id');
    }
}
