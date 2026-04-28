import { formatearDinero } from "../helpers";



export default function Producto({producto}) {
    const {nombre, imagen, precio} = producto;
  return (
    <div className="p-3 border-gray-300 border-2 shadow-amber-50 shadow  ">
        <img 
            src={`img/${imagen}.jpg`}
            alt={nombre}
            className="w-full"
        />

        <div className="p-10">
            <h3 className="text-2xl font-bold ">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-orange-400 start-px">{formatearDinero(precio)}</p>

            <button className="bg-indigo-500 hover:bg-indigo-900 text-white text-xl font-bold w-full p-3 mt-5">
                Agregar
            </button>
        </div>
    </div>
  )
}
