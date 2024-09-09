<?php

namespace App\Http\Controllers;

use App\Models\Cashier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashierController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->query('date');
        $start_date = $request->query('start_date');
        $end_date = $request->query('end_date');

        $cashier = Cashier::selectedByDate($date)
            ->selectedByPeriod($start_date, $end_date)
            ->with('sells', 'company', 'user')
            ->where('company_id', auth()->user()->company_id)
            ->orderBy('created_at', 'desc')
            ->paginate(30);



        return Inertia::render(
            'Cashiers/Index',
            [
                'cashiers' => $cashier,
                'search' => [
                    'date' => $date,
                    'start_date' => $start_date,
                    'end_date' => $end_date,
                ]
            ]
        );
    }

    public function store()
    {
        $cashier = Cashier::byCompany()
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
