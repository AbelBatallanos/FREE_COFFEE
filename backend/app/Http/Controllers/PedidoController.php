<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["pedidos" => Pedido::with(["cliente","productos"])->where("estado", false)->get()], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $newPedido =Pedido::create([
            "cliente_id" => auth()->id(),
            "total" => $request->total,
        ]);

        DB::transaction(function () use ($newPedido) {
            $dataPedidos = [];
            foreach (request()->pedidos as $pedido) {
                $dataPedidos[] = [
                    'pedido_id' => $newPedido->id,
                    'producto_id' => $pedido['producto_id'],
                    'cantidad' => $pedido['cantidad'],
                    "created_at" => Carbon::now(),
                    "updated_at" => Carbon::now(),
                ];
            }
            DB::table('pedido_productos')->insert($dataPedidos);
        });
        
        return response()->json(["message" => "Pedido creado exitosamente", "all" => $request->all()], 201);
    }


    public function show(Pedido $pedido)
    {
        return response()->json(["pedido" => $pedido], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        $pedido->update([
            "estado" => true
        ]);

        return response()->json(["message" => "Pedido completado exitosamente"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        //
    }
}
