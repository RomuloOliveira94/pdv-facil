<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSellRequest;
use App\Http\Requests\UpdateSellRequest;
use App\Models\Product;
use App\Models\Sell;
use Illuminate\Support\Facades\Auth;

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

        return inertia('Sells/Create', [
            'products' => Product::where('company_id', $user_company->id)->get(),
            'paymentMethods' => $user_company->paymentTypes,
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
            'cashier_id' => Auth::id(),
            'payment_type_id' => $request->payment_type_id ?? '1',
            'delivery_tax' => $request->delivery_tax ?? 0,
            'discount' => $request->discount ?? 0,
            'subtotal' => $request->subtotal ?? 0,
            'total' => $request->total ?? 0,
        ]);

        dd($request->all());
        $sell = Sell::create($request->all());

        foreach ($request->products as $product) {
            $sell->products()->attach($product['id'], [
                'quantity' => $product['quantity'],
            ]);
        }
        return redirect()->route('sells.index');
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
