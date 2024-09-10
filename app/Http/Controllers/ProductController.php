<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $product = $request->query('product');
        $products = Product::selectedByName($product)->where('company_id', auth()->user()->company_id)->paginate(16);

        return inertia('Products/Index', [
            'products' => $products,
            'search' => $product,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $company_product_categories = Category::where('company_id', auth()->user()->company_id)
            ->where('type', 'PRODUCT')->get();

        return inertia('Products/Create', [
            'categoryTypes' => $company_product_categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $newProduct = Product::create($request->all());
        $newProduct->categories()->sync($request->categories);

        return redirect()->route('products.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $company_product_categories = Category::where('company_id', auth()->user()->company_id)
            ->where('type', 'PRODUCT')->get();

        return inertia('Products/Edit', [
            'product' => $product,
            'categoryTypes' => $company_product_categories,
            'categories' => $product->categories->pluck('id')->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->all());
        $product->categories()->sync($request->categories);

        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->sells()->exists()) {
            return redirect()->route('products.index')->with('error', 'O Produto não pode ser excluído pois está vinculado a uma venda.');
        }

        $product->categories()->detach();
        $product->delete();

        Storage::delete('public/' . $product->imageUrl);

        return redirect()->route('products.index')->with('success', 'Produto excluído com sucesso.');
    }
}
