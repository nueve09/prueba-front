// Bibliotecas
import React from "react";
// Componentes
import { TituloArticle } from "@components/main/ui/TituloArticle";
import { TituloSeccion } from "@components/main/ui/TituloSeccion";


// Componente Remesas
const Inicio = () => {


  return (
    <article className="flex h-full lg:flex-row">

      <section className={`relative h-full w-full bg-gray-dark flex flex-col p-8`}>
        <TituloArticle />
        <TituloSeccion title="Inicio" />
      </section>

    </article>
  );
};

export default Inicio;
