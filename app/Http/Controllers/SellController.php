<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSellRequest;
use App\Http\Requests\UpdateSellRequest;
use App\Models\Product;
use App\Models\Sell;

class SellController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Sells/Index', [
            'sells' => Sell::with('product')->get()
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
            ]);
        }
        return redirect()->route('sells.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Sell $sell)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sell $sell)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSellRequest $request, Sell $sell)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sell $sell)
    {
        //
    }
}
