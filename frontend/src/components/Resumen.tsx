import React, { useMemo } from 'react'
import useQuiosco from '../hook/useQuiosco';
import { formatearDinero } from '../helpers';
import useAuth from '../hook/useAuth';

export default function Resumen() {
   const {logout} = useAuth({middleware: 'auth'});
  const {pedidos, handleEditarPedido, handleBorrarPedido,handleEnviarPedido,totalPrecioPedido} = useQuiosco();
  const comprobarPedidos = ()=> pedidos.length === 0;

  const handleEnviarOrden = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comprobarPedidos()) {
      return;
    } 
    handleEnviarPedido(logout);
  }
  return (
    <div className='md:w-72'>
        <aside className='p-5'>
            <h1 className='text-2xl font-bold'>Mi Pedido</h1>

            <p>Aqui podras ver el resumen y totales de tu pedido</p>

            <div className='p-3 mt-5 bg-gray-50 shadow border-gray-200 mb-4'>
                {
                  pedidos.length === 0 ? (
                    <p className='text-center text-2xl'>Aun no hay productos en tu pedido</p>
                  ) : (
                    pedidos.map((pedido) => (
                      <div key={pedido.id} className='p-2 mb-5 border-gray-200  shadow'>
                        <p className='text-lg font-bold'>{pedido.nombre}</p>
                        <p className='text-ms font-bold text-amber-600/70'>Precio: {formatearDinero(pedido.precio??0)}</p>
                        <p className='text-ms font-bold'>Cantidad: {pedido.cantidad}</p>
                        <p className='text-lg font-bold text-indigo-500'>SubTotal: <span className='text-amber-600'>{formatearDinero((pedido.precio * pedido.cantidad)??0)}</span></p>
                        <div className='flex justify-around  mt-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 bg-indigo-400 hover:bg-indigo-900 text-white rounded p-1" onClick={()=>{
                            handleEditarPedido(pedido.id)
                            }}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 bg-red-400 hover:bg-red-900 text-white rounded p-1" onClick={()=>{
                            handleBorrarPedido(pedido.id)
                          }}>
                            <path  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </div>
                      </div>
                    ))
                  )
                }
            </div>

            <p className='text-xl font-bold text-indigo-700'>Total: <span className='text-amber-600'>{formatearDinero(totalPrecioPedido??0)}</span></p>

            <form className='w-full' onSubmit={handleEnviarOrden}>

              <button type='submit' className={`bg-indigo-500 hover:bg-indigo-900 text-white text-xl font-bold w-full p-3 mt-5 ${comprobarPedidos() ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={comprobarPedidos()} >
                Enviar Pedidos
              </button>

            </form>
        </aside>
    </div>
  )
}
