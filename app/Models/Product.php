<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'category', 'company_id', 'imageUrl'];

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
