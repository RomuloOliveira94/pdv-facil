<?php

namespace App\Http\Controllers;

use App\Models\Cashier;
use Inertia\Inertia;

class CashierController extends Controller
{
    public function index()
    {
        return Inertia::render(
            'Cashiers/Index',
            [
                'cashiers' => Cashier::with('sells', 'company')
                    ->where('company_id', auth()->user()->company_id)
                    ->orderBy('created_at', 'desc')
                    ->get(),
            ]
        );
    }

    public function store()
    {
        $cashiers = Cashier::where('company_id', auth()->user()->company_id)
            ->whereDate('created_at', now())
            ->get();

        if ($cashiers->count() > 0) {
            return redirect()->route('sells.create');
        }

        Cashier::create([
            'company_id' => auth()->user()->company_id,
        ]);

        return redirect()->route('sells.create');
    }
}
