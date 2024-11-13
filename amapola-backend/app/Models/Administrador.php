<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Administrador extends Authenticatable
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'administrador';

    // Clave primaria
    protected $primaryKey = 'rut';
    public $incrementing = false;
    protected $keyType = 'string';

    // Campos que se pueden asignar de forma masiva
    protected $fillable = [
        'rut',
        'NombreUsuario',
        'correo',
        'contraseña',
    ];

    // Ocultar el campo de contraseña en JSON
    protected $hidden = [
        'contraseña',
    ];
}
