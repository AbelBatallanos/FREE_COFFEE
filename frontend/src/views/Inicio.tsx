import Producto from "../components/Producto";
import { productos } from "../data/productos";
import useQuiosco from "../hook/useQuiosco";



export default function Inicio(){

    const {auth} = useQuiosco();
    console.log(auth)
    return(
        <>
            <h1 className="text-3xl font-bold ">Inicio</h1>
            <p className="text-2xl my-10">Elige y personaliza tu pedido a continuación</p>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {productos.map(product=> (
                        <Producto 
                            key={product.id}
                            producto={product}
                        />
                       
                ))}
            </div>
        </>
    );
}