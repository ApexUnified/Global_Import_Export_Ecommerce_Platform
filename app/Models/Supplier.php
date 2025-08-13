<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Supplier extends Model
{
    protected $fillable = ['company_name', 'user_id'];

    protected $appends = ['added_at'];

    // Relation Ships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function batches(): HasMany
    {
        return $this->hasMany(Batch::class, 'supplier_id', 'id');
    }

    // Attributes
    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }
}
