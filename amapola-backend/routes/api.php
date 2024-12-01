<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\GananciaController;
use App\Http\Controllers\AuthController;

// Ruta para obtener el usuario autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas protegidas para el rol 'admin'
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/vender', [VentaController::class, 'venderProducto']);
    Route::apiResource('productos', ProductoController::class);
    Route::apiResource('administradores', AdministradorController::class);
    Route::apiResource('compras', CompraController::class);
    Route::post('/comprar', [CompraController::class, 'comprarProducto']);
    Route::get('/ganancias', [GananciaController::class, 'calcularGanancias']);
    Route::get('/ventas', [VentaController::class, 'index']);
});

// Rutas públicas
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
