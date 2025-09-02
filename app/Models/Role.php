<?php

namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $appends = ['added_at'];

    // Attributes
    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }
}
