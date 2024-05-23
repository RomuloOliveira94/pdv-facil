<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cashier extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'total',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function sells()
    {
        return $this->hasMany(Sell::class);
    }
}
