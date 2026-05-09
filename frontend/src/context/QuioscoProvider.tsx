import { createContext, useEffect, useMemo, useState } from "react";
import { categorias as categoriasDB} from "../data/categorias";
import {toast, Flip} from "react-toastify";
import clienteAxios from "../config/axios";
import useAuth from "../hook/useAuth";

const QuioscoContext= createContext();



const QuioscoProvider = ({children})=>{
    
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedidos, setPedidos] = useState([]);
   
    const totalPrecioPedido = useMemo(() => {
        return pedidos.reduce((total, pedido) => total + pedido.precio * pedido.cantidad, 0);
    }, [pedidos]);
    
    const ObtenerDatos = async()=>{
        try {
            const {data} = await clienteAxios('/categorias');
            console.log(data.data);
            setCategorias(data.data);
            setCategoriaActual(data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    
    useEffect(()=>{
        console.log(pedidos);
    },[pedidos])
    useEffect(()=>{
        ObtenerDatos();
    },[])

    const handleClickCategoria = (id)=>{
        const categoria = categorias.find(cat => cat.id === id)
        setCategoriaActual(categoria)   
    }

    const handleClickModal = ()=>{   
        setModal(!modal)
    }

    const handleSetProducto = (producto)=>{
        setProducto(producto)

    }

    const handleEditarPedido = (id)=>{
        const productoActual = pedidos.find(pedido => pedido.id === id);
        setProducto(productoActual);
        setModal(!modal);
    }

    const handleBorrarPedido = (id)=>{
        const pedidosActualizados = pedidos.filter(pedido => pedido.id !== id);
        setPedidos(pedidosActualizados);
        toast.success('Pedido eliminado correctamente', {
            position: "top-right",
            autoClose: 5000,});
    }
    const handleAgregarPedido = ({categoria_id, ...producto})=>{   
        if(pedidos.some(p => p.id === producto.id)){ //actualizamos si el producto ya existe
            const pedidosActualizados = pedidos.map(p => p.id === producto.id ? producto : p);
            setPedidos(pedidosActualizados);
            setProducto({});
            toast.success('Pedido actualizado correctamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
            return;
        }
        toast.success('Pedido agregado correctamente', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
        });
        setPedidos([...pedidos, producto])
        setProducto({});
    }

    const handleEnviarPedido = async(logout)=>{
        try {
            const token = localStorage.getItem('token');
            const x = pedidos.map(pedido => ({
                producto_id: pedido.id,
                cantidad: pedido.cantidad,
            }))
            console.log(x);
            // const total = pedidos.reduce((total, pedido) => total + pedido.precio * pedido.cantidad, 0);
            const {data} = await clienteAxios.post('/pedidos', 
                {
                    total: totalPrecioPedido,
                    pedidos: x,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
            });
            console.log(data);
            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
            setTimeout(() => {
                toast.info('Redireccionando a la pagina de inicio...', {
                    position: "top-right",
                });
                setPedidos([]);
                }, 2000);

            setTimeout(() => {
                logout();
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }
    const handleAgotarProducto = async (id)=>{
        
        try{
            const res = await clienteAxios.put("productos/" + id, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            toast.success(`${res.data.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
            console.log(res);
        }catch (error) {
            console.log(error);
        }
    }
    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedidos, 
                setPedidos,
                totalPrecioPedido,
                handleAgregarPedido,
                handleEditarPedido,
                handleBorrarPedido,
                handleEnviarPedido,
                handleAgotarProducto,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {QuioscoProvider}

export default QuioscoContext

