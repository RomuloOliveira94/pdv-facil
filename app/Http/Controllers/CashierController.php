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
                'cashiers' => Cashier::with('sells', 'company', 'user')
                    ->where('company_id', auth()->user()->company_id)
                    ->orderBy('created_at', 'desc')
                    ->get(),
            ]
        );
    }

    public function store()
    {
        $cashier = Cashier::where('company_id', auth()->user()->company_id)
            ->whereDate('created_at', today())
            ->first();

        if ($cashier) {

            $cashier->update([
                'active' => true,
            ]);

            return redirect()->route('sells.create');
        }

        Cashier::create([
            'company_id' => auth()->user()->company_id,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->route('sells.create');
    }

    public function update(Cashier $cashier)
    {
        $cashier->update([
            'active' => !$cashier->active,
        ]);

        return redirect()->route('cashiers.index');
    }
}
