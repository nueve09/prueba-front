// Bibliotecas
import React from "react";
// CSS Styles
import '@styles/Credito.css'
// Componentes
import { TituloArticle } from "@components/main/ui/TituloArticle";
import { TituloSeccion } from "@components/main/ui/TituloSeccion";


// Componente Remesas
const Credito = () => {

  return (

    <article>

      {/* Seccion */}
      <section className="seccion_credito">

        {/* Titulo del articulo */}
        <TituloArticle />

        {/* Titulo de la seccion */}
        <TituloSeccion title="Crédito" />


      </section>

    </article>

  );
};

export default Credito;

