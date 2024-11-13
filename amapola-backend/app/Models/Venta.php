<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'venta';

    // Clave primaria
    protected $primaryKey = 'idVenta';

    // Campos que se pueden asignar de forma masiva
    protected $fillable = [
        'producto_id',
        'precioVenta',
        'cantidadVendida',
        'fechaVenta',
    ];

    // Relaciones
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
