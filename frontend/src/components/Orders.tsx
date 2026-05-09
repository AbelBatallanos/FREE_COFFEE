import useSWR  from 'swr';
import clienteAxios from '../config/axios';
import { useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify/unstyled';

export default function Orders() {

    const fetcher = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await clienteAxios.get("pedidos", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;

        } catch (error) {
            throw Error(error?.response?.data?.message || 'Error al obtener los pedidos');
        }
    }
    const { data, error, isLoading } = useSWR('/pedidos', fetcher, {
        refreshInterval: 2000, // Refresca cada 2 segundos
        revalidateOnFocus: true // Si el admin cambia de pestaña y vuelve, se actualiza el estado de los pedidos
    });
    console.log(data);
    if (error) {
        return <div className='text-red-500'>Error al obtener los pedidos</div>;
    }
    if (isLoading) {
        return <div>Cargando pedidos...</div>;
    }

    const hanleCompletarPedido = async(pedidoId) => {
        // Aquí puedes implementar la lógica para marcar el pedido como completado
        // Por ejemplo, podrías hacer una solicitud a tu backend para actualizar el estado del pedido
        console.log(`Pedido ${pedidoId} completado`);
        toast.success(`Pedido ${pedidoId} completado`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

        const token = localStorage.getItem("token");
        try {
            const response = await clienteAxios.put(`/pedidos/${pedidoId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
        } catch (error) {
            toast.error(`Error al completar el pedido ${pedidoId}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }
    return (
        <div>
            <h1 className='text-4xl font-black'>Pedidos</h1>
            <p className='text-2xl my-10'>Administra tus pedidos</p>

            <div className='grid md:grid-cols-2 gap-5 h-svh overflow-y-scroll'>
                {data?.pedidos?.map(pedido => (
                    <div key={pedido.id} className='bg-gray-50 p-5 space-y-2 rounded-md shadow-xl shadow-gray-300 hover:shadow-gray-500 transition-shadow'>
                        <p className='text-xl font-bold'>Contenido del Pedido: {pedido.id}</p>
                        <ul className='flex flex-col gap-2 my-3 border-t border-b border-gray-200 p-3'>
                        <p className='text-lg font-bold'>Productos:</p>
                            {pedido.productos.map(producto => (
                                <li key={producto.id}>{producto.nombre} - Cantidad: {producto.pivot.cantidad}</li>
                            ))}
                        </ul>
                        <p className='text-lg'>Cliente: {pedido.cliente?.name}</p>
                        <p className='text-lg text-yellow-500 font-bold'>Total a Pagar: {pedido.total}</p>
                        <button className='bg-indigo-600 w-full hover:bg-indigo-800 cursor-pointer text-white font-bold py-2 px-4 rounded mt-5'
                        onClick={() => hanleCompletarPedido(pedido.id)}>
                            Completar Pedido
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}