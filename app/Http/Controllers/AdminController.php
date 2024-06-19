<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Index');
    }

    public function CompaniesIndex()
    {
        return Inertia::render('Admin/Companies/Index');
    }

    public function CompanyCreate()
    {
        return Inertia::render('Admin/Companies/Create');
    }

    public function CompanyStore(Request $request)
    {
        //
    }

    public function CompanyEdit(Company $company)
    {
        return Inertia::render('Admin/Companies/Edit');
    }

    public function CompanyUpdate(Request $request, Company $company)
    {
        //
    }

    public function UsersIndex()
    {
        return Inertia::render('Admin/Users/Index');
    }

    public function UserCreate()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function UserStore(Request $request)
    {
        //
    }

    public function UserEdit(User $user)
    {
        return Inertia::render('Admin/Users/Edit');
    }

    public function UserUpdate(Request $request, User $user)
    {
        //
    }
}