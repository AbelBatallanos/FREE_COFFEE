<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/pedidos', \App\Http\Controllers\PedidoController::class);
    Route::apiResource('/productos', ProductoController::class);
});

Route::apiResource('/categorias', CategoriaController::class);

Route::post("/register", [\App\Http\Controllers\AuthController::class, 'register']);
Route::post("/login", [\App\Http\Controllers\AuthController::class, 'login']);
Route:
Route::middleware('auth:sanctum')->post("/logout", [\App\Http\Controllers\AuthController::class, 'logout']);


