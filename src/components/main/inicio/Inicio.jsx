// Bibliotecas
import React from "react";
// CSS Styles
import '@styles/Inicio.css'
// Componentes
import { TituloArticle } from "@components/main/ui/TituloArticle";
import { TituloSeccion } from "@components/main/ui/TituloSeccion";


// Componente Remesas
const Inicio = () => {

  return (

    <article>

      {/* Seccion */}
      <section className="seccion_inicio">

        {/* Titulo del articulo */}
        <TituloArticle />

        {/* Titulo de la seccion */}
        <TituloSeccion title="Inicio" />


      </section>

    </article>

  );
};

export default Inicio;

