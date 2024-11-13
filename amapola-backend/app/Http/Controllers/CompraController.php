<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Producto;
use Illuminate\Http\Request;

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
