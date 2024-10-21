// Biblioteca
import React from 'react'

// Componente Titulo Seccion
export const TituloSeccion = ({ title }) => {
  return (
    <h1 className={`text-viking-400 font-extrabold my-4 text-xl md:text-2xl xl:text-3xl `}>
      {title}
    </h1>
  )
}
