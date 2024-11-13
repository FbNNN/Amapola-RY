<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\VentaController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::apiResource('productos', ProductoController::class);
Route::apiResource('administradores', AdministradorController::class);
Route::apiResource('compras', CompraController::class);
Route::apiResource('ventas', VentaController::class);

