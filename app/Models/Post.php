<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;
use Str;

class Post extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'images',
        'videos',
        'slug',
        'tag',
        'latitude',
        'longitude',
        'location_name',
        'post_type',
        'status',
        'floor_id',
    ];

    protected $appends = ['added_at', 'post_image_urls', 'post_video_urls', 'created_at_time', 'is_bookmarked'];

    // RelationShips
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class, 'floor_id', 'id');
    }

    public function bookmarkedByUsers()
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'post_id', 'user_id')->withTimestamps();
    }

    // Attributes
    public function getAddedAtAttribute()
    {
        return ! empty($this->created_at) ? $this->created_at->format('Y-m-d') : null;
    }

    public function getCreatedAtTimeAttribute()
    {
        return $this->created_at->format('g:i A');
    }

    public function getPostImageUrlsAttribute()
    {
        return array_map(function ($image) {
            return $image['url'];
        }, $this->images ?? []);
    }

    public function getPostVideoUrlsAttribute()
    {
        return array_map(function ($video) {
            return $video['url'];
        }, $this->videos ?? []);
    }

    public function getIsBookmarkedAttribute()
    {
        return $this->bookmarkedByUsers()->where('user_id', Auth::id())->exists();
    }

    // Static Booting
    public static function booted()
    {
        static::creating(function ($post) {
            $post->user_id = Auth::id();
        });

        static::created(function ($post) {
            $post->slug = Str::slug($post->title.'-'.time().'-'.$post->id);
            $post->save();
        });

    }

    // Casting
    protected $casts = [
        'images' => 'array',
        'videos' => 'array',
    ];
}
