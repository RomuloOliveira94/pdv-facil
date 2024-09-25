<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'cnpj',
        'address',
        'city',
        'zip_code',
        'neighborhood',
        'address_number',
        'address_complement',
        'pix_key',
        'logo',
        'state',
        'phone',
        'email',
        'status',
    ];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute()
    {
        return $this->logo ? Storage::url($this->logo) : null;
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function sales()
    {
        return $this->hasMany(Sell::class);
    }

    public function cashiers()
    {
        return $this->hasMany(Cashier::class);
    }

    public function paymentTypes()
    {
        return $this->belongsToMany(PaymentType::class, 'company_payment_type');
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}
