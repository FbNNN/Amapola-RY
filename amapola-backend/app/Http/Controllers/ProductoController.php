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
    // Validar los datos
    $validatedData = $request->validate([
        'nombre' => 'required|string|max:150',
        'precioVentaAprox' => 'required|integer|min:0', // Asegura que el precio sea no negativo
        'cantidad' => 'required|integer|min:0', // La cantidad debe ser no negativa
        'CodigoDeBarra' => 'required|string|max:255|unique:productos', // Asegúrate que 'productos' sea el nombre correcto de la tabla
        'CostePromedio' => 'nullable|numeric|min:0', // CostePromedio puede ser null o un número positivo
    ]);

    try {
        // Crear el producto
        $producto = Producto::create([
            'nombre' => $validatedData['nombre'],
            'precioVentaAprox' => $validatedData['precioVentaAprox'],
            'cantidad' => $validatedData['cantidad'],
            'CodigoDeBarra' => $validatedData['CodigoDeBarra'],
            'CostePromedio' => $validatedData['CostePromedio'] ?? null, // Manejo de valores opcionales
        ]);

        return response()->json([
            'message' => 'Producto creado con éxito',
            'data' => $producto,
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error al crear el producto',
            'error' => $e->getMessage(),
        ], 500);
    }
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
