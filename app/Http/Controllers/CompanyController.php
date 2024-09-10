<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Models\Company;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_company = auth()->user()->company;
        //show only the companies that the user has access to
        return Inertia::render('Company/Index', [
            'company' => $user_company,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Company/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        $user = auth()->user();
        $clear_payment_types = array_filter($request->payment_types);

        $company = Company::create($request->all());
        $company->paymentTypes()->sync($clear_payment_types);

        $user->company_id = $company->id;
        $user->save();

        return redirect()->route('company.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {

        return Inertia::render('Company/Edit', [
            'company' => $company->load('paymentTypes'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $clear_payment_types = array_filter($request->payment_types);

        $company->paymentTypes()->sync($clear_payment_types);
        $company->update($request->all());
        return redirect()->route('company.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
