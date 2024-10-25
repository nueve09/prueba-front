// Bibliotecas
import React from "react";
// CSS Styles
import '@styles/Graficas.css'
// Componentes
import { TituloArticle } from "@components/main/ui/TituloArticle";
import { TituloSeccion } from "@components/main/ui/TituloSeccion";


// Componente Remesas
const Graficas = () => {

  return (

    <article>

      {/* Seccion */}
      <section className="seccion_graficas">

        {/* Titulo del articulo */}
        <TituloArticle />

        {/* Titulo de la seccion */}
        <TituloSeccion title="Gráficas" />


      </section>

    </article>

  );
};

export default Graficas;

