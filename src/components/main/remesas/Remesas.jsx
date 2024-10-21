// Bibliotecas
import React, { useState } from "react";
import RemesasData from '@redux/slices/remesas';
// CSS Styles
import '@styles/remesas.css'
// Componentes
import { Calculadora } from "@components/main/remesas/Calculadora";
import { Notificacion } from "@components/main/remesas/Notificacion";
import { Usuario } from "@components/main/remesas/Usuario";
import { BotonTeclado } from "@components/main/remesas/BotonTeclado";
import { Fecha } from "@components/main/remesas/Fecha";
import { BotonAccion } from "@components/main/remesas/BotonAccion";
import { TablaRemesas } from "@components/main/remesas/TablaRemesas";
import { Filtro } from "@components/main/remesas/Filtro";
import { BotonAuxiliar } from "@components/main/remesas/BotonAuxiliar";
import { TituloArticle } from "@components/main/ui/TituloArticle";
import { TituloSeccion } from "@components/main/ui/TituloSeccion";
// Data
import { Icons } from "@data/icons";


// Componente Remesas
const Remesas = () => {

  // Hooks
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState(0);
  const [visibleSection, setVisibleSection] = useState("calculadora");
  const [remesas, setRemesas] = useState(RemesasData.data);

  // Constantes
  const opcionesFiltro = ["ID", "Company", "Amount"];


  // Alternar la visibilidad del input de filtro
  const toggleFilterVisibility = () => {
    setInputVisible((prev) => !prev);
  };

  // Maneja la búsqueda en la tabla
  const handleSearch = (query) => {
    setTempSearchQuery(query);
    setSearchQuery(query);
  };

  // Maneja la opcion del filtro
  const handleFilterToggle = () => {
    setCurrentFilter((prev) => (prev + 1) % opcionesFiltro.length);
  };

  // Alternar la visibilidad de calculadora o tabla de remesas
  const toggleSection = () => {
    setVisibleSection((prev) => (prev === "calculadora" ? "tablaremesas" : "calculadora"));
  };


  return (
    <article className="flex h-full lg:flex-row">

      {/* Seccion izquierda - Calculadora */}
      <section className={`relative h-full w-full lg:w-1/2 bg-gray-dark flex flex-col p-8 ${visibleSection === "calculadora" ? "block" : "hidden"} lg:block lg:static`}>

        <BotonAuxiliar onClick={toggleSection} icons={[Icons.Table, Icons.GoRight]} type="tabla" />

        <TituloArticle />
        <TituloSeccion title="Remesas" />

        <Calculadora remesas={remesas} setRemesas={setRemesas} />

      </section>


      {/* Seccion derecha - Tabla de remesas */}
      <section className={`relative h-full w-full lg:w-1/2 bg-white-50 text-tuatara-900 flex flex-col px-5 py-4 ${visibleSection === "tablaremesas" ? "block" : "hidden"} lg:block lg:static`}>

        <BotonAuxiliar onClick={toggleSection} icons={[Icons.GoLeft, Icons.Calculator]} type="calculadora" />

        <div className={`w-full h-14 flex justify-end items-center gap- py-5 sm:gap-4`}>
          <Notificacion />
          <Usuario />
        </div>

        <div className={`w-full h-12 flex items-center justify-between py-7 sm:h-16 md:h-20`}>
          <Fecha title="Hoy" />
          <BotonTeclado onClick={toggleFilterVisibility} />
        </div>

        <div className={`w-full h-16 flex items-center justify-end py-4 gap-2`}>
          <Filtro isInputVisible={isInputVisible} currentFilter={currentFilter} filterOptions={opcionesFiltro} tempSearchQuery={tempSearchQuery} handleSearch={handleSearch} />
          <BotonAccion value={Icons.Search} onClick={() => !isInputVisible && toggleFilterVisibility()} />
          <BotonAccion value={Icons.Filter} onClick={handleFilterToggle} />
          <BotonAccion value={Icons.Print} />
        </div>

        <div className={`w-full flex-grow border-none overflow-y-auto max-h-[calc(100vh-230px)] scroll-container`}>
          <TablaRemesas remesas={remesas} searchQuery={searchQuery} currentFilter={opcionesFiltro[currentFilter].toLowerCase()} />
        </div>

      </section>

    </article>
  );
};

export default Remesas;
