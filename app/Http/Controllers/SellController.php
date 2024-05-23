<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSellRequest;
use App\Models\Product;
use App\Models\Sell;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SellController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->query('date');

        if ($query) {
            $date = Carbon::parse($query)->toDateString();
            $sells = Sell::selectedByDate($date)
                ->with('products', 'paymentType')->paginate(10);
        } else {
            $sells = Sell::with('products', 'paymentType')->paginate(10);
        }

        return inertia('Sells/Index', [
            'sells' => $sells,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user_company = auth()->user()->company;
        $today_cashier = $user_company->cashiers()->whereDate('created_at', now())->first();

        return inertia('Sells/Create', [
            'products' => Product::where('company_id', $user_company->id)->get(),
            'paymentMethods' => $user_company->paymentTypes,
            'cashier' => $today_cashier,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSellRequest $request)
    {
        $company_id = auth()->user()->company_id;

        if (!$company_id) {
            return redirect()->route('sells.index');
        }

        $request->merge([
            'company_id' => $company_id,
        ]);

        $sell = Sell::create($request->all());

        foreach ($request->products as $product) {
            $sell->products()->attach($product['id'], [
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }
        return redirect()->route('sells.create');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sell $sell)
    {
        if (auth()->user()->company_id !== $sell->company_id || auth()->user()->role === 'cashier') {
            return redirect()->route('sells.index');
        }

        $sell->products()->detach();
        $sell->delete();
        return redirect()->route('sells.index');
    }
}
