<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sell extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'cashier_id',
        'payment_type_id',
        'delivery_tax',
        'discount',
        'subtotal',
        'total',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_sell');
    }
}
