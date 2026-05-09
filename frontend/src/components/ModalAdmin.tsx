import useQuiosco from "../hook/useQuiosco";





export default function ModalAdmin() {

    const {producto, handleClickModal, handleAgotarProducto} = useQuiosco();
    console.log(producto)
    return(

        <div className="">
            
            <p className="text-xl text-indigo-500 font-bold">Estas seguro de que quieres agotar este producto?</p>
            <section className="flex gap-4">
                <button type="button"
                    className="bg-indigo-500 hover:bg-indigo-900 text-white text-xl font-bold w-full p-2 mt-5" 
                    onClick={()=>{
                        handleAgotarProducto(producto.id)
                        handleClickModal()
                        }
                    }>
                    Confirmar
                </button>
                <button 
                type="button"   
                    className="bg-red-500 hover:bg-red-900 text-white text-xl font-bold w-full p-2 mt-5"
                    onClick={handleClickModal}>
                    Cancelar
                </button>
            </section>
        
        </div>
    );
}