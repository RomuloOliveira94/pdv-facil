<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use App\Models\Company;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Company $company)
    {
        if ($company->id !== auth()->user()->company_id) {
            return redirect()->route('company.index');
        }

        $categories = $company->categories;

        return inertia('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(Company $company)
    {
        if ($company->id !== auth()->user()->company_id) {
            return redirect()->route('company.index');
        }

        return inertia('Categories/Create', [
            'company' => $company,
            'categoryTypes' => Category::CATEGORY_TYPES,
        ]);
    }

    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->all());
        return redirect()->route('categories.index');
    }
}
