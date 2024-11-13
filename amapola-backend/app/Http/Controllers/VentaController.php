<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Models\Producto;
use Illuminate\Http\Request;

class VentaController extends Controller
{
    // Obtener todas las ventas
    public function index()
    {
        $ventas = Venta::with('producto')->get();
        return response()->json($ventas);
    }

    // Registrar una nueva venta
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'producto_id' => 'required|exists:producto,id',
            'precioVenta' => 'required|integer',
            'cantidadVendida' => 'required|integer',
            'fechaVenta' => 'required|date',
        ]);

        $venta = Venta::create($validatedData);

        // Actualizar la cantidad de producto
        $producto = Producto::find($request->producto_id);
        $producto->cantidad -= $request->cantidadVendida;
        $producto->save();

        return response()->json($venta, 201);
    }

    // Obtener una venta por ID
    public function show($id)
    {
        $venta = Venta::with('producto')->findOrFail($id);
        return response()->json($venta);
    }

    // Eliminar una venta
    public function destroy($id)
    {
        $venta = Venta::findOrFail($id);
        $venta->delete();
        return response()->json(['message' => 'Venta eliminada']);
    }
}
