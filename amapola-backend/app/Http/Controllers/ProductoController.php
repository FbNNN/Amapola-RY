<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    // Obtener todos los productos
    public function index()
    {
        $productos = Producto::all();
        return response()->json($productos);
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:150',
            'precioVentaAprox' => 'required|integer',
            'cantidad' => 'required|integer',
            'CodigoDeBarra' => 'required|string|max:255|unique:productos', // Asegúrate que el nombre de la tabla sea 'productos'
            'CostePromedio' => 'nullable|string|max:45',
        ]);

        // Crear el producto
        $producto = Producto::create($validatedData);
        return response()->json($producto, 201);
    }

    // Obtener un producto por ID
    public function show($id)
    {
        // Buscar el producto por ID
        $producto = Producto::findOrFail($id);
        return response()->json($producto);
    }

    // Actualizar un producto
    public function update(Request $request, $id)
    {
        // Buscar el producto por ID
        $producto = Producto::findOrFail($id);

        // Actualizar el producto con los datos del request
        $producto->update($request->all());

        return response()->json($producto);
    }

    // Eliminar un producto
    public function destroy($id)
    {
        // Buscar el producto por ID
        $producto = Producto::findOrFail($id);

        // Eliminar el producto
        $producto->delete();

        return response()->json(['message' => 'Producto eliminado']);
    }
}
