<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth', 'company-check')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Index');
    })->name('inicio');

    Route::get('/dashboard', function () {
        return Inertia::render('Index');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/products', ProductController::class);

    Route::resource('/sells', SellController::class);

    Route::resource('/cashiers', CashierController::class);

    Route::get('/company', [CompanyController::class, 'index'])->name('company.index');
    Route::get('/company/{company}/edit', [CompanyController::class, 'edit'])->name('company.edit');
    Route::put('/company/{company}', [CompanyController::class, 'update'])->name('company.update');
});

Route::controller(AdminController::class)->group(function () {
    Route::get('/admin', 'index')->name('admin.index');
    //companies
    Route::get('/admin/companies', 'CompaniesIndex')->name('admin.companies.index');
    Route::get('/admin/companies/create', 'CompanyCreate')->name('admin.companies.create');
    Route::post('/admin/companies', 'CompanyStore')->name('admin.companies.store');
    Route::get('/admin/companies/{company}/edit', 'CompanyEdit')->name('admin.companies.edit');
    Route::put('/admin/companies/{company}', 'CompanyUpdate')->name('admin.companies.update');
    //users
    Route::get('/admin/users', 'UsersIndex')->name('admin.users.index');
    Route::get('/admin/users/create', 'UserCreate')->name('admin.users.create');
    Route::post('/admin/users', 'UserStore')->name('admin.users.store');
    Route::get('/admin/users/{user}/edit', 'UserEdit')->name('admin.users.edit');
    Route::put('/admin/users/{user}', 'UserUpdate')->name('admin.users.update');
});

Route::get('/company/create', [CompanyController::class, 'create'])->middleware(['auth'])->name('company.create');
Route::post('/company/store', [CompanyController::class, 'store'])->middleware(['auth'])->name('company.store');


require __DIR__ . '/auth.php';
