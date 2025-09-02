<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inventory extends Model
{
    protected $fillable = [
        'smartphone_id',
        'batch_id',
        'storage_location_id',
        'imei1',
        'imei2',
        'eid',
        'serial_no',
        'returned_date',
        'status',
    ];

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

    public function batch(): BelongsTo
    {
        return $this->belongsTo(Batch::class, 'batch_id', 'id');

    }

    public function storage_location(): BelongsTo
    {
        return $this->belongsTo(StorageLocation::class, 'storage_location_id', 'id');
    }

    // Casting
    protected $casts = [
        'returned_date' => 'date:Y-m-d',
    ];
}
