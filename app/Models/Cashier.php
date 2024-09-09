<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cashier extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'user_id',
        'active',
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

    public function scopeSelectedByDate($query, $date)
    {
        if (!$date) {
            return $query;
        }
        $date = Carbon::parse($date)->setTimezone('America/Sao_Paulo')->toDateString();
        return $query->whereDate('created_at', $date);
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

    public function scopeByCompany($query)
    {
        return $query->where('company_id', auth()->user()->company_id);
    }
}
