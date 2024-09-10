<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\Company;

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
            'company' => $company,
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

    public function store(StoreCategoryRequest $request, Company $company)
    {
        Category::create($request->all());
        return redirect()->route('categories.index', $company);
    }

    public function edit(Company $company, Category $category)
    {
        if ($company->id !== auth()->user()->company_id) {
            return redirect()->route('company.index');
        }

        return inertia('Categories/Edit', [
            'company' => $company,
            'category' => $category,
            'categoryTypes' => Category::CATEGORY_TYPES,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Company $company, Category $category)
    {
        $category->update($request->all());
        return redirect()->route('categories.index', $company);
    }

    public function destroy(Company $company, Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index', $company);
    }
}
