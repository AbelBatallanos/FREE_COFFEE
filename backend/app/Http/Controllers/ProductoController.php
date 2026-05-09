<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProductoResource;
use App\Http\Resources\ProductoCollection;
use App\Models\Producto;
class ProductoController extends Controller
{
    public function index()
    {
        return new ProductoCollection(Producto::where('disponible', true)->orderBy('created_at', 'desc')->get());
    }

    public function show(Producto $producto)
    {
        return new ProductoResource($producto);
    }

    public function update(Producto $producto)
    {
        $producto->update([
            "disponible" => false
        ]);  

        return response()->json(["message" => "Producto marcado como no disponible", "data"=> $producto], 200);
    }
}
