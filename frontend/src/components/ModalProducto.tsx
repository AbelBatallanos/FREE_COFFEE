import { useState, useEffect } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hook/useQuiosco";



export default function ModalProducto() {

    const {producto, handleClickModal, handleAgregarPedido, pedidos} = useQuiosco();
    const [cantidadProducto, setCantidadProducto] = useState(1);
    const [edicion, setEdicion] = useState(false);

    useEffect(() => {
        if(pedidos.some(pedido => pedido.id === producto.id)){
            const pedidoActual = pedidos.find(pedido => pedido.id === producto.id);
            setCantidadProducto(pedidoActual.cantidad);
            setEdicion(true);
            return;
        }
        setEdicion(false);
    }, [pedidos])
    return (
        <div className="md:flex md:gap-10">
            <div className="w-1/3 ">
                <img src={`img/${producto.imagen}.jpg`} alt="Imagen producto" className="w-full"/>
            </div>
            <div className=" w-full ">
                <div className="relative mb-7">
                    <button className="absolute top-0 right-0" onClick={() => {
                        handleClickModal();
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                             <path  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </button>
                </div>
                <h1 className="text-3xl font-bold">{producto.nombre}</h1>
                <p className="mt-5 font-black text-4xl text-orange-400 start-px">{formatearDinero(producto.precio??0)}</p>
                <div className="flex gap-5">
                    <button className="bg-indigo-500 hover:bg-indigo-900 text-white text-2xl font-bold  p-3 mt-5 rounded-4xl" onClick={()=>{
                        if(cantidadProducto <= 1) return;
                        setCantidadProducto(cantidadProducto - 1)
                    }}>
                        -
                    </button>
                    <p className="text-3xl mt-7">{cantidadProducto}</p>
                    <button className="bg-indigo-500 hover:bg-indigo-900 text-white text-2xl font-bold  p-3 mt-5 rounded-4xl" onClick={()=>{
                        if(cantidadProducto >= 5) return;
                        setCantidadProducto(cantidadProducto + 1)
                    }}>
                        +
                    </button>

                </div>
                <button className="bg-indigo-500 hover:bg-indigo-900 text-white text-xl font-bold  p-3 mt-5" onClick={()=>{
                    handleAgregarPedido({...producto, cantidad: cantidadProducto});
                    handleClickModal();
                }}>
                   {edicion ? "Actualizar Pedido" : "Añadir Pedido"}
                </button>
            </div>
        </div>
    )
}