<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdministradorController extends Controller
{
    // Obtener todos los administradores
    public function index()
    {
        $administradores = Administrador::all();
        return response()->json($administradores);
    }

    // Registrar un nuevo administrador
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'rut' => 'required|string|max:255|unique:administrador',
            'NombreUsuario' => 'required|string|max:255',
            'correo' => 'required|email|unique:administrador',
            'contraseña' => 'required|string|min:8',
        ]);

        $validatedData['contraseña'] = Hash::make($validatedData['contraseña']);
        $administrador = Administrador::create($validatedData);

        return response()->json($administrador, 201);
    }

    // Obtener un administrador por rut
    public function show($rut)
    {
        $administrador = Administrador::findOrFail($rut);
        return response()->json($administrador);
    }

    // Actualizar un administrador
    public function update(Request $request, $rut)
    {
        $administrador = Administrador::findOrFail($rut);
        $administrador->update($request->all());
        return response()->json($administrador);
    }

    // Eliminar un administrador
    public function destroy($rut)
    {
        $administrador = Administrador::findOrFail($rut);
        $administrador->delete();
        return response()->json(['message' => 'Administrador eliminado']);
    }
}
