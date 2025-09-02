<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{
    protected $fillable = ['name','iso_code','is_active'];




    // Attributes
    protected $appends = ['added_at'];
    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }


    // RelationShips
    // public function special_countries() : HasMany
    // {
    //     return $this->hasMany(SpecialCountry::class,'country_id','id');
    // }
}
