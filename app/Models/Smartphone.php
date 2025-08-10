<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Smartphone extends Model
{
    protected $fillable = [
        'model_name',
        'capacity',
        'color_ids',
        'upc',
        'selling_price',
        'images',
    ];

    protected $appends = ['added_at', 'colors', 'smartphone_image_urls'];

    // Attributes

    public function getColorsAttribute()
    {
        return Color::whereIn('id', $this->color_ids)->get();
    }

    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    public function getSmartphoneImageUrlsAttribute()
    {
        return array_map(function ($image) {
            return $image['url'];
        }, $this->images ?? []);
    }

    // Casting
    protected $casts = [
        'color_ids' => 'array',
        'images' => 'array',
    ];
}
