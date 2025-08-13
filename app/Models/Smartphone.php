<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Smartphone extends Model
{
    protected $fillable = [
        'model_name_id',
        'capacity_id',
        'color_ids',
        'upc',
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

    // RelationShip
    public function model_name(): BelongsTo
    {
        return $this->belongsTo(ModelName::class, 'model_name_id', 'id');
    }

    public function capacity(): BelongsTo
    {
        return $this->belongsTo(Capacity::class, 'capacity_id', 'id');
    }

    public function inventory_items(): HasMany
    {
        return $this->hasMany(Inventory::class, 'smartphone_id', 'id');
    }

    public function selling_info(): HasMany
    {
        return $this->hasMany(SmartphoneForSale::class, 'smartphone_id', 'id');
    }

    // Casting
    protected $casts = [
        'color_ids' => 'array',
        'images' => 'array',
    ];
}
