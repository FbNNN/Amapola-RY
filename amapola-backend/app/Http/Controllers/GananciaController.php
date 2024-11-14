<?php
// app/Http/Controllers/GananciaController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class GananciaController extends Controller
{
    public function calcularGanancias(Request $request)
    {
        $mes = $request->query('mes');
        $anio = $request->query('anio');

        // Verificar si los parámetros existen
        if (!$mes || !$anio) {
            return response()->json(['error' => 'Parámetros de mes y año son requeridos'], 400);
        }

        try {
            $ganancias = DB::table('venta as v')
                ->join('producto as p', 'v.producto_id', '=', 'p.id')
                ->select(DB::raw('SUM(v.precioVenta - p.CostePromedio) as ganancias'))
                ->whereMonth('v.fechaVenta', $mes)
                ->whereYear('v.fechaVenta', $anio)
                ->first();

            if ($ganancias) {
                return response()->json(['ganancias' => $ganancias->ganancias]);
            } else {
                return response()->json(['ganancias' => 0]);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al calcular ganancias: ' . $e->getMessage()], 500);
        }
    }
}
