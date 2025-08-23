<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'order_no',
        'customer_id',
        'amount',
        'status',
        'collaborator_id',
        'courier_company',
        'shipping_date',
        'tracking_no',
        'courier_invoice',
        'payment_proof',
        'is_cash_collected',
    ];

    //    Attributes
    protected $appends = ['added_at'];

    public function getAddedAtAttribute()
    {
        return $this->created_at->format('Y-m-d');
    }

    // RelationShips
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function collaborator(): BelongsTo
    {
        return $this->belongsTo(Collaborator::class, 'collaborator_id', 'id');
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    // Static Booting
    public static function booted()
    {
        static::created(function ($order) {
            $order->order_no = 'ORD-'.str_pad($order->id, 5, '0', STR_PAD_LEFT);

            $reward_rate = null;
            $total_points = null;

            if (! empty($order->collaborator_id)) {
                if (empty($order->collaborator->point_accumulation_rate)) {
                    $reward_rate = RewardSetting::first()->reward_rate;
                    $total_points = $order->amount * $reward_rate / 100;
                } else {
                    $reward_rate = $order->collaborator->point_accumulation_rate;
                    $total_points = $order->amount * $reward_rate / 100;
                }

                $user_id = $order->customer->user_id;

                $reward_point = RewardPoint::where('user_id', $user_id)->first();

                if (empty($reward_point)) {
                    RewardPoint::create([
                        'user_id' => $user_id,
                        'points' => $total_points,
                        'expires_at' => now()->addYears(5),
                    ]);
                } else {
                    $reward_point->points += round($total_points);
                    $reward_point->save();
                }
            }

            $order->save();
        });
    }

    // Casting
    protected $casts = [
        'shipping_date' => 'date:Y-m-d',
    ];
}
