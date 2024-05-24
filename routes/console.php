<?php

use App\Models\Cashier;
use Illuminate\Support\Facades\Schedule;


Schedule::call(function () {
    Cashier::whereNot('created_at', now())->update(['active' => false]);
})->daily();
