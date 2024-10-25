// Bibliotecas
import React from "react";
// CSS Styles
import '@styles/Transferencias.css'
// Componentes
import { TituloArticle } from "@components/main/ui/TituloArticle";
import { TituloSeccion } from "@components/main/ui/TituloSeccion";


// Componente Remesas
const Transferencias = () => {

  return (

    <article>

      {/* Seccion */}
      <section className="seccion_transferencias">

        {/* Titulo del articulo */}
        <TituloArticle />

        {/* Titulo de la seccion */}
        <TituloSeccion title="Transferencias" />


      </section>

    </article>

  );
};

export default Transferencias;

