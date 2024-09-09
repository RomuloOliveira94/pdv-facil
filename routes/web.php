<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index');
})->name('inicio')->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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

Route::resource('/products', ProductController::class)->middleware('auth');

Route::resource('/sells', SellController::class)->middleware('auth');

Route::resource('/cashiers', CashierController::class)->middleware('auth');

Route::get('/company', [CompanyController::class, 'index'])->middleware('auth')->name('company.index');

Route::get('company/{company}', [CompanyController::class, 'edit'])->middleware('auth')->name('company.edit');

Route::put('company/{company}', [CompanyController::class, 'update'])->middleware('auth')->name('company.update');

require __DIR__ . '/auth.php';
