<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Producto;
use Illuminate\Http\Request;
USE DB;

class CompraController extends Controller
{
    // Obtener todas las compras
    public function index()
    {
        $compras = Compra::with('producto')->get();
        return response()->json($compras);
    }

    // Registrar una nueva compra
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'producto_id' => 'required|exists:producto,id',
            'precioCompra' => 'required|integer',
            'cantidadComprada' => 'required|integer',
            'fechaCompra' => 'required|date',
        ]);

        $compra = Compra::create($validatedData);
        return response()->json($compra, 201);
    }

    public function ComprarProducto(Request $request)
    {
        // Validación de los datos del request
        $validatedData = $request->validate([
            'producto_id' => 'required|exists:producto,id', // Verificar que el producto exista
            'cantidadComprada' => 'required|integer|min:1', // Verificar que la cantidad sea positiva
            'precioCompra' => 'required|numeric|min:0', // Verificar que el precio sea un número positivo
        ]);

        // Buscar el producto en la base de datos
        $producto = Producto::findOrFail($validatedData['producto_id']);


        // Reducir la cantidad del producto en inventario
        $producto->cantidad += $validatedData['cantidadComprada'];
        $producto->save();

        // Obtener los valores actuales del producto
    $costePromedioActual = $producto->CostePromedio;
    $cantidadActual = $producto->cantidad;

    // Calcular el nuevo coste promedio
    $nuevoCostePromedio = ($costePromedioActual * $cantidadActual + $precioCompra * $cantidadComprada) / ($cantidadActual + $cantidadComprada);

    // Actualizar el producto con el nuevo coste promedio y la nueva cantidad
    $producto->CostePromedio = $nuevoCostePromedio;
    $producto->cantidad += $cantidadComprada;
    $producto->save();


        // Registrar la venta en la tabla 'ventas'
        $Compra = new Compra();
        $Compra->producto_id = $producto->id;
        $Compra->cantidadComprada = $validatedData['cantidadComprada'];
        $Compra->precioCompra = $validatedData['precioCompra'];
        $Compra->fechaCompra = now(); 

        // Devolver la respuesta
 
    }

    // Obtener una compra por ID
    public function show($id)
    {
        $compra = Compra::with('producto')->findOrFail($id);
        return response()->json($compra);
    }

    // Eliminar una compra
    public function destroy($id)
    {
        $compra = Compra::findOrFail($id);
        $compra->delete();
        return response()->json(['message' => 'Compra eliminada']);
    }
}
