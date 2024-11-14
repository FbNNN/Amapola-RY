<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Models\Producto;
use Illuminate\Http\Request;

class VentaController extends Controller
{
    // Obtener todas las ventas
   public function index(Request $request)
   {
       // Obtener el año actual
       $year = date('Y');

       // Verificar si el parámetro de mes existe, si no, asignar el mes actual
       $month = $request->input('month', date('m'));

       // Filtrar ventas del año actual y del mes seleccionado
       $ventas = Venta::with('producto')
                       ->whereYear('fechaVenta', $year)
                       ->whereMonth('fechaVenta', $month)
                       ->get();

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
    public function calcularGanancias(Request $request)
       {
           try {
               $mes = $request->query('mes');
               $anio = $request->query('anio');

               // Realizar el cálculo de ganancias
               $ganancias = DB::table('venta as v')
                   ->join('producto as p', 'v.producto_id', '=', 'p.id')
                   ->select(DB::raw('SUM(v.precioVenta - p.CostePromedio) AS ganancias'))
                   ->whereMonth('v.fechaVenta', $mes)
                   ->whereYear('v.fechaVenta', $anio)
                   ->first();

               return response()->json(['ganancias' => $ganancias->ganancias]);
           } catch (\Exception $e) {
               return response()->json(['error' => 'Error al calcular ganancias: ' . $e->getMessage()], 500);
           }
       }
}
