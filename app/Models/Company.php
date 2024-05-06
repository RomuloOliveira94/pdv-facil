<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
