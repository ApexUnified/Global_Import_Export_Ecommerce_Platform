<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'short_description',
        'thumbnail',
        'is_active',
    ];

    // Attributes
    protected $appends = ['added_at', 'thumbnail_url'];

    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    public function getThumbnailUrlAttribute()
    {
        if (! empty($this->thumbnail)) {
            return $this->thumbnail['url'];
        }

        return null;
    }

    // Casting
    protected $casts = [
        'thumbnail' => 'array',
    ];
}
