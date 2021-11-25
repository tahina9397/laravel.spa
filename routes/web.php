<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', [IndexController::class, 'index'])->name('index.index');

Route::get('/{any}', function () {
    return Inertia::render('Test');
    // return view('app');
})->where('any', '.*');
