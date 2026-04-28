import useQuiosco from "../hook/useQuiosco";
import Categoria from "./Categoria";


export default function Sidear() {

    const {categorias} = useQuiosco();
    return (
        <aside className="md:w-72">
            <div>
                <img 
                    src="img/logo.svg"
                    alt="img-logo"
                    className=""
                />
            </div>

            <div className="mt-10">
                {categorias.map(( categ)=>(
                        <Categoria 
                            key={categ.id}
                            categoria={categ}
                        />  
                    )
                )}
            </div>

            <div className="my-5 px-5">
                <button
                    type="button"
                    className="text-center bg-red-500 w-full p-3 font-bold text-white mt-4 hover:bg-red-800 hover:text-white/80 truncate"
                >
                    Cancelar Orden
                </button>
            </div>
        </aside>
    )
}
