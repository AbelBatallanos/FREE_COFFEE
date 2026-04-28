import React from 'react'
import useQuiosco from '../hook/useQuiosco';

export default function Categoria({categoria}) {


    const {handleClickCategoria , categoriaActual} = useQuiosco()
    const {nombre, icono, id} = categoria;
    const resaltarCategoriaSeleccionado = categoriaActual.id === categoria.id ? "bg-amber-400": ""
    return (
        <div className={`${resaltarCategoriaSeleccionado} flex items-center gap-4 border w-full p-3 hover:bg-amber-400`}>
            
            <img
                alt='Imagen Icono'
                src={`/img/icono_${icono}.svg`}
                className='w-12'
            />
            <button 
                className='text-lg font-bold cursor-pointer w-full text-start truncate'
                onClick={()=>{handleClickCategoria(id)}}
                >
                    {nombre}
            </button>
        </div>
    )
}
