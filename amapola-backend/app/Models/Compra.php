<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'compra';

    // Clave primaria
    protected $primaryKey = 'idCompra';

    // Campos que se pueden asignar de forma masiva
    protected $fillable = [
        'producto_id',
        'precioCompra',
        'cantidadComprada',
        'fechaCompra',
    ];

    // Relaciones
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
