<?php

namespace App\Models;

use Carbon\Carbon;
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
        return $this->belongsToMany(Product::class, 'product_sell')->withPivot('quantity', 'price');
    }

    public function cashier()
    {
        return $this->belongsTo(Cashier::class);
    }

    public function paymentType()
    {
        return $this->belongsTo(PaymentType::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function scopeSelectedByDate($query, $date)
    {
        if (!$date) {
            return $query;
        }
        $date = Carbon::parse($date)->setTimezone('America/Sao_Paulo')->toDateString();
        return $query->whereDate('created_at', $date);
    }

    public function scopeSelectedByProduct($query, $product)
    {
        if (!$product) {
            return $query;
        }
        return $query->whereHas('products', function ($query) use ($product) {
            $query->where('name', 'like', '%' . $product . '%');
        });
    }

    public function scopeSelectedByPeriod($query, $start, $end)
    {
        if (!$start || !$end) {
            return $query;
        }
        $start = Carbon::parse($start)->setTimezone('America/Sao_Paulo')->toDateString();
        $end = Carbon::parse($end)->setTimezone('America/Sao_Paulo')->toDateString();
        return $query->whereBetween('created_at', [$start, $end]);
    }
}