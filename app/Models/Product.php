<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'company_id', 'imageUrl'];

    protected $appends = ['image'];

    public function getImageAttribute()
    {
        return $this->imageUrl ? Storage::url($this->imageUrl) : null;
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function sells()
    {
        return $this->belongsToMany(Sell::class, 'product_sell');
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }


    public function scopeSelectedByName($query, $name)
    {
        return $query->where('name', 'like', "%$name%");
    }
}
