// Bibliotecas
import React from "react";
// CSS Styles
import '@styles/Reportes.css'
// Componentes
import { TituloArticle } from "@components/main/ui/TituloArticle";
import { TituloSeccion } from "@components/main/ui/TituloSeccion";


// Componente Remesas
const Reportes = () => {

  return (

    <article>

      {/* Seccion */}
      <section className="seccion_reportes">

        {/* Titulo del articulo */}
        <TituloArticle />

        {/* Titulo de la seccion */}
        <TituloSeccion title="Reportes" />


      </section>

    </article>

  );
};

export default Reportes;
