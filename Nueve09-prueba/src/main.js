/** ESTILOS */
import './styles/app.css'
import './styles/menu.css'
import './styles/remesas-section.css'
import './styles/modal.css'

import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { TableManager } from './scripts/table.js'
import {mockData} from './mocks/data'
import './scripts/transfer-keypad.js'

/** SECCIÓN HEADEAR */
const date = document.getElementById('date');
const opcionesBasicas = { year: 'numeric', month: 'long', day: 'numeric' };
date.textContent = new Intl.DateTimeFormat('es-ES', opcionesBasicas).format(new Date());

/** SECCIÓN TABLA */
const tbody = document.getElementById('tbody-transfers');
const previousButton = document.getElementById('previous-page');
const nextButton = document.getElementById('next-page');
const paginationInfo = document.getElementById("paginationInfo");
//createTable(mockData, tbody, previousButton, nextButton)
const manager = new TableManager(mockData, tbody, previousButton, nextButton, paginationInfo);

/** búsqueda con input */
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  if (searchInput.classList.contains("active")) {
    searchInput.focus(); // enfoca automáticamente
  } else {
    searchInput.value = ""; //limpiar al cerrar
  }
});

// Filtrado
searchInput.addEventListener('input', (e) => {
  manager.filter(e.target.value);
});