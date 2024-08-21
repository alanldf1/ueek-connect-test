<?php

use App\Http\Controllers\NumbersController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getnumbers', [NumbersController::class, 'getNumbers']);
Route::get('/getuserbydocument', [UserController::class, 'getUserByDocument']);
Route::post('/saveuser', [UserController::class, 'saveNewUser']);
Route::post('/savepurchase', [PurchaseController::class, 'saveNewPurchase']);