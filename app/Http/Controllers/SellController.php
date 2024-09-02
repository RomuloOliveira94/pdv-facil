<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSellRequest;
use App\Models\Cashier;
use App\Models\Product;
use App\Models\Sell;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->query('date');
        $product = $request->query('product');
        $start_date = $request->query('start_date');
        $end_date = $request->query('end_date');

        $sells = Sell::where('company_id', auth()->user()->company_id)
            ->selectedByDate($date)
            ->selectedByProduct($product)
            ->selectedByPeriod($start_date, $end_date)
            ->with('products', 'paymentType', 'cashier')->orderBy('created_at', 'desc')->paginate(10);

        return inertia('Sells/Index', [
            'sells' => $sells,
            'user' => auth()->user(),
            'search' => [
                'date' => $date,
                'product' => $product,
                'start_date' => $start_date,
                'end_date' => $end_date,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $name = $request->query('product');

        $user_company = auth()->user()->company;
        $today_cashier = $user_company?->cashiers()?->whereDate('created_at', today())->first();

        if (!$today_cashier) {
            return redirect()->route('company.index');
        }

        $products = Product::selectedByName($name)->where('company_id', $user_company->id)->paginate(8);


        return inertia('Sells/Create', [
            'products' => $products,
            'paymentMethods' => $user_company->paymentTypes,
            'cashier' => $today_cashier,
            'search' => $name,
        ]);
    }

    public function store(StoreSellRequest $request)
    {
        $cashier = Cashier::find($request->cashier_id);
        $company_id = auth()->user()->company_id;

        if (!$company_id || $company_id !== $request->company_id || !$cashier) {
            return redirect()->route('sells.index');
        }

        $sell = Sell::create($request->all());

        foreach ($request->products as $product) {
            $sell->products()->attach($product['id'], [
                'quantity' => $product['quantity'],
                'price' => $product['price'],
            ]);
        }

        $cashier->update([
            'total' => $cashier->total + $request->total,
        ]);

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

        $sell->cashier->update([
            'total' => $sell->cashier->total - $sell->total,
        ]);
        $sell->products()->detach();
        $sell->delete();
    }
}
