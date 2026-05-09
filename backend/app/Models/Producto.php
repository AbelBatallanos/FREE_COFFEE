<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    public $fillable = ["nombre", "precio", "disponible"];

    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class, "pedido_productos")->withPivot("cantidad"); // Relación muchos a muchos con Pedido a través de la tabla intermedia pedido_productos
    }
}
