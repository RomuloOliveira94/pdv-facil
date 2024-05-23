<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cashier extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'total',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function sells(): HasMany
    {
        return $this->hasMany(Sell::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
