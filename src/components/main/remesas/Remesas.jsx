// Bibliotecas
import React, { useState } from "react";
import RemesasData from '@redux/slices/remesas';
// CSS Styles
import '@styles/Remesas.css'
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
  const [showSection, setShowSection] = useState(true);
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState(0);
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


  return (

    <article className={showSection ? 'mostrar_calculadora' : 'mostrar_tabla'}>

      {/* Seccion derecha - Tabla de remesas */}
      <section className="seccion_remesas seccion_calculadora">

        {/* Boton para intercambiar secciones */}
        <BotonAuxiliar onClick={() => setShowSection(false)} icons={[Icons.Table, Icons.GoRight]} type="tabla" />

        {/* Titulo del articulo */}
        <TituloArticle />

        {/* Titulo de la seccion */}
        <TituloSeccion title="Remesas" />

        {/* Calculadora */}
        <Calculadora remesas={remesas} setRemesas={setRemesas} />

      </section>



      {/* Seccion derecha - Tabla de remesas */}
      <section className="seccion_remesas seccion_tabla">

        {/* Boton para intercambiar secciones */}
        <BotonAuxiliar onClick={() => setShowSection(true)} icons={[Icons.GoLeft, Icons.Calculator]} type="calculadora" />

        <div className="seccion_notificacion">
          <Notificacion />
          <Usuario />
        </div>

        <div className="contenedor_fecha">
          <Fecha title="Hoy" />
          <BotonTeclado onClick={toggleFilterVisibility} />
        </div>

        <div className="contenedor_acciones">
          <Filtro isInputVisible={isInputVisible} currentFilter={currentFilter} filterOptions={opcionesFiltro} tempSearchQuery={tempSearchQuery} handleSearch={handleSearch} />
          <BotonAccion value={Icons.Search} onClick={() => !isInputVisible && toggleFilterVisibility()} />
          <BotonAccion value={Icons.Filter} onClick={handleFilterToggle} />
          <BotonAccion value={Icons.Print} />
        </div>

        <div className="contenedor_tabla scroll-container">
          <TablaRemesas remesas={remesas} searchQuery={searchQuery} currentFilter={opcionesFiltro[currentFilter].toLowerCase()} />
        </div>

      </section>


    </article>

  );
};

export default Remesas;
