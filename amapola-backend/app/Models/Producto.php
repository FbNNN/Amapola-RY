<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'producto';

    // Clave primaria
    protected $primaryKey = 'id';

    // Campos que se pueden asignar de forma masiva
    protected $fillable = [
        'nombre',
        'precioVentaAprox',
        'cantidad',
        'CodigoDeBarra',
        'CostePromedio',
    ];

    // Relaciones
    public function compras()
    {
        return $this->hasMany(Compra::class, 'producto_id');
    }

    public function ventas()
    {
        return $this->hasMany(Venta::class, 'producto_id');
    }
}
