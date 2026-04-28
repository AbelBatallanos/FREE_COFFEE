import React from 'react'

export default function Categoria({categoria}) {

    const {nombre, icono, id} = categoria;

    return (
        <div className='flex items-center gap-4 border w-full p-3 hover:bg-amber-400'>
            
            <img
                alt='Imagen Icono'
                src={`/img/icono_${icono}.svg`}
                className='w-12'
            />
            <p className='text-lg font-bold cursor-pointer truncate'>{nombre}</p>
        </div>
    )
}
