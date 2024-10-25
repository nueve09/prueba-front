// Biblioteca
import React from 'react'
// CSS Styles
import '@styles/TitulosUI.css'


// Componente Titulo Seccion
export const TituloSeccion = ({ title }) => {
  return (
    <h1 className="titulo_seccion">
      {title}
    </h1>
  )
}
