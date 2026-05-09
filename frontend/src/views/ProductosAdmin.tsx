


import Producto from "../components/Producto";
import useQuiosco from "../hook/useQuiosco";
import clienteAxios from "../config/axios";
import useSWR from "swr";  //Actua como un cache para evitar hacer peticiones cada vez que se renderiza el componente, se actualiza cada vez que se hace una petición nueva o cada cierto tiempo. y hace de forma automática, no es necesario hacer nada para que se actualice, solo hay que hacer la petición y el hook se encarga de actualizar el cache y el componente se vuelve a renderizar con los nuevos datos. 

export default function ProductoAdmin(){
    
    const {categoriaActual} = useQuiosco();

    const fechet = async () => {
        const res = await clienteAxios("/productos", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return res.data.data;
    };

    
    const {data, error, isLoading} = useSWR('/api/productos', fechet,{
        refreshInterval: 1000
    });
    
    if(isLoading) return "Cargando...";
    const productos = data.filter(p=> p.categoria_id === categoriaActual.id);

    return(
        <>
            <h1 className="text-3xl font-bold ">{categoriaActual.nombre}</h1>
            <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {productos.map(product=> (
                        <Producto 
                            key={product.id}
                            producto={product}
                            botonEditar={true}
                        />
                ))}
            </div>
        </>
    );
}