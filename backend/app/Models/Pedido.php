<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    public $fillable = ["cliente_id", "total", "estado"];

    public function cliente()
    {
        return $this->belongsTo(User::class, "cliente_id");
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class, "pedido_productos")->withPivot("cantidad");
    }
}
