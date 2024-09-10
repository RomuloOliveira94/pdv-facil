<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'slug',
        'company_id',
        'type'
    ];

    const CATEGORY_TYPES = [
        'PRODUCT' => 'Produto',
        'PAY_ACCOUNT' => 'Contas a pagar',
        'SERVICES' => 'Serviços'
    ];

    public function categorizables()
    {
        return $this->morphTo();
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
