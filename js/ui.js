const remesas = [
    { id: "12763845", company: "Western Union", amount: 12000, status: "COBRADO", created_at: "20231015", charged_at: "20231015", cobrado: true },
    { id: "27381640", company: "Western Union", amount: 8500, status: "COBRADO", created_at: "20231016", charged_at: null, cobrado: true },
    { id: "83476029", company: "Western Union", amount: 15000, status: "COBRADO", created_at: "20231017", charged_at: "20231017", cobrado: true },
    { id: "29461583", company: "Western Union", amount: 2000, status: "COBRADO", created_at: "20231018", charged_at: "20231018", cobrado: true },
    { id: "84710362", company: "Western Union", amount: 10500, status: "COBRADO", created_at: "20231019", charged_at: null, cobrado: true },
    { id: "73618402", company: "Western Union", amount: 9800, status: "COBRADO", created_at: "20231020", charged_at: "20231020", cobrado: true },
    { id: "38510647", company: "Western Union", amount: 11300, status: "COBRADO", created_at: "20231021", charged_at: null, cobrado: true },
    { id: "90182743", company: "Western Union", amount: 25000, status: "COBRADO", created_at: "20231022", charged_at: "20231022", cobrado: true },
    { id: "48209356", company: "Western Union", amount: 7600, status: "COBRADO", created_at: "20231023", charged_at: null, cobrado: true },
    { id: "70926318", company: "Western Union", amount: 41000, status: "COBRADO", created_at: "20231024", charged_at: "20231024", cobrado: true },
    { id: "31947528", company: "Western Union", amount: 5000, status: "NO_COBRADO", created_at: "20231025", charged_at: null, cobrado: false },
    { id: "62193478", company: "Western Union", amount: 31000, status: "NO_COBRADO", created_at: "20231026", charged_at: "20231026", cobrado: false },
    { id: "47291056", company: "Western Union", amount: 3300, status: "NO_COBRADO", created_at: "20231027", charged_at: null, cobrado: false },
    { id: "15309472", company: "Western Union", amount: 21000, status: "NO_COBRADO", created_at: "20231028", charged_at: "20231028", cobrado: false },
    { id: "82047193", company: "Western Union", amount: 6800, status: "NO_COBRADO", created_at: "20231029", charged_at: null, cobrado: false },
    { id: "90318476", company: "Western Union", amount: 15000, status: "NO_COBRADO", created_at: "20231030", charged_at: "20231030", cobrado: false },
    { id: "61394028", company: "Western Union", amount: 12300, status: "NO_COBRADO", created_at: "20231030", charged_at: null, cobrado: false },
    { id: "48123697", company: "Western Union", amount: 4500, status: "NO_COBRADO", created_at: "20231031", charged_at: "20231031", cobrado: false }
  ];


  const remesasPorPagina = 6;
  let paginaActual = 1;
  let screenDirection = "horizontal"


  function updateTransactionListByPages(pageNumber){

  }


  
  function actualizarContenedor() {
    const contenedor = document.getElementById("transaction-list");
    contenedor.innerHTML = ""; // Limpiar el contenido actual del contenedor
  
    // Calcular el índice de inicio y final en la lista de remesas para la página actual
    const inicio = (paginaActual - 1) * remesasPorPagina;
    const fin = inicio + remesasPorPagina;
    const remesasPagina = remesas.slice(inicio, fin);
  
    // Crear los elementos de las remesas según la estructura proporcionada
    remesasPagina.forEach(remesa => {
      const remesaDiv = document.createElement("div");
      remesaDiv.classList.add("transaction-button-area");
  
      const upperDiv = document.createElement("div");
      upperDiv.classList.add("upper-transaction-button-area");
      upperDiv.innerHTML = `
        <div class="transaction-id">#${remesa.id}</div>
        <div class="transaction-company">${remesa.company}</div>
        <div class="transaction-amount">$${remesa.amount.toLocaleString()}</div>
      `;
  
      const downDiv = document.createElement("div");
      downDiv.classList.add("down-transaction-button-area");
      downDiv.innerHTML = `
        <div class="date-of-transaction ${remesa.cobrado ? "" : "hidden"}">${formatearFecha(remesa.charged_at || remesa.created_at)}</div>
        <div class="is-cashed-area">
          <div class="is-cashed-text ${remesa.cobrado ? "" : "not-cashed"}">${remesa.cobrado ? "Cobrado" : "Pendiente"}</div>
          <div class="is-cashed-icon ${remesa.cobrado ? "" : "not-cashed"}">${remesa.cobrado ? "✔" : "✘"}</div>
        </div>
      `;
  
      // Añadir el evento de clic para seleccionar el div
      remesaDiv.addEventListener("click", () => seleccionarRemesa(remesaDiv));
  
      remesaDiv.appendChild(upperDiv);
      remesaDiv.appendChild(downDiv);
      contenedor.appendChild(remesaDiv);
    });
  
    actualizarBotones();
  }
  
  function seleccionarRemesa(remesaDiv) {
    // Remover la clase "selected" del div previamente seleccionado, si existe
    const seleccionadoAnterior = document.querySelector(".transaction-button-area.selected");
    if (seleccionadoAnterior) {
      seleccionadoAnterior.classList.remove("selected");
    }
  
    // Añadir la clase "selected" al div actualmente seleccionado
    remesaDiv.classList.add("selected");
  }
  
  function cambiarPagina(pagina) {
    paginaActual = pagina;
    actualizarContenedor();
  }
  
  function actualizarBotones() {
    const botones = document.querySelectorAll(".page-buttons-area .page-button");
    botones.forEach((boton, index) => {
      if (index + 1 === paginaActual) {
        boton.classList.add("selected");
      } else {
        boton.classList.remove("selected");
      }
    });
  }
  
  function formatearFecha(fecha) {
    return fecha.slice(6, 8) + "/" + fecha.slice(4, 6) + "/" + fecha.slice(0, 4);
  }
  
  // Inicializar la vista de la primera página
  actualizarContenedor();





  const buttonTransactionHTML = '<div class="transaction-button-area"><div class="upper-transaction-button-area"><div class="transaction-id">#29939303</div><div class="transaction-company">Western Union</div><div class="transaction-amount">$12,000.00</div></div><div class="down-transaction-button-area"><div class="date-of-transaction">10/09/2024</div><div class="is-cashed-area"><div class="is-cashed-text">Cobrado</div><div class="is-cashed-icon">✔</div></div></div></div>'


  function buscarRemesas(remesas, criterio) {
    // Convertimos el criterio en una cadena para facilitar la comparación
    const criterioStr = criterio.toString();
  
    return remesas.filter(remesa => {
      // Si el criterio es numérico, buscamos en `id` y `amount`
      if (!isNaN(criterio)) {
        return remesa.id.startsWith(criterioStr) || remesa.amount.toString().startsWith(criterioStr);
      }
      // Si el criterio es una cadena, buscamos en `company`
      else {
        return remesa.company.toLowerCase().startsWith(criterioStr.toLowerCase());
      }
    });
  }
  
  // Ejemplo de uso con la lista de remesas previamente definida:
  console.log(buscarRemesas(remesas, 12000));       // Busca por id o amount que empiece con 1276
  console.log(buscarRemesas(remesas, "Western"));  // Busca por empresa que empiece con "Western"








  const inputField = document.querySelector('#transaction-id-input-area input');
  const inputFieldVertical = document.querySelector('#id-input-box');

  // Filtrar las remesas no cobradas
  const remesasNoCobradas = remesas.filter(rem => !rem.cobrado);
  
  // Función para agregar números al campo de entrada
  document.querySelectorAll('.number-button').forEach(button => {
      button.addEventListener('click', () => {
          const value = button.innerText;
          if (inputField.value.length < inputField.maxLength) {
              inputField.value += value;
          }
      });
  });

    // Función para agregar números al campo de entrada
    document.querySelectorAll('.vertical-number-button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.innerText;
            if (inputFieldVertical.value.length < inputFieldVertical.maxLength) {
                inputFieldVertical.value += value;
            }
        });
    });
    
  
  // Función para borrar el último dígito
  document.querySelector('#delete-number-button').addEventListener('click', () => {
      inputField.value = inputField.value.slice(0, -1);
  });
  
  // Función para comprobar y cobrar la remesa
  document.querySelector('#enter-number-button').addEventListener('click', () => {
      const enteredId = inputField.value.trim();
      if (!enteredId) return;
  
      const remesa = remesasNoCobradas.find(rem => rem.id === enteredId);  
if (remesa) {
    remesa.cobrado = true; // Cambia el estado a cobrado
    actualizarContenedor(); // Actualiza la lista de remesas en el DOM
    
    // Remueve la remesa del array de no cobradas
    const index = remesasNoCobradas.indexOf(remesa);
    if (index !== -1) {
        remesasNoCobradas.splice(index, 1); // Elimina del array
    }

    message_alert_area.innerHTML = `Remesa con ID ${remesa.id} cobrada exitosamente.`;
    message_alert_area.className = "";
} else if (enteredId.length < 8) {
    message_alert_area.innerHTML = "El ID de la remesa debe tener 8 dígitos.";
    message_alert_area.className = "error";
} else {
    message_alert_area.innerHTML = "No se encontró ninguna remesa no cobrada con ese ID.";
    message_alert_area.className = "error";
}
  });
  
// Función para aplicar el filtro de búsqueda y reiniciar la paginación
function aplicarFiltro() {
  const criterio = document.getElementById("search").value;
  remesasFiltradas = buscarRemesas(remesas, criterio);
  paginaActual = 1; // Reinicia a la primera página al aplicar un nuevo filtro
  actualizarListadoRemesas();
  actualizarBotonesPaginacion();
}

// Función que actualiza el listado de remesas en la página actual
function actualizarListadoRemesas() {
  const contenedor = document.getElementById("transaction-list");
  contenedor.innerHTML = ""; // Limpiar el contenido actual del contenedor
  
  const inicio = (paginaActual - 1) * remesasPorPagina;
  const fin = inicio + remesasPorPagina;
  const remesasPagina = remesasFiltradas.slice(inicio, fin);
  
  remesasPagina.forEach(remesa => {
    const remesaDiv = document.createElement("div");
    remesaDiv.classList.add("transaction-button-area");

    const upperDiv = document.createElement("div");
    upperDiv.classList.add("upper-transaction-button-area");
    upperDiv.innerHTML = `
      <div class="transaction-id">#${remesa.id}</div>
      <div class="transaction-company">${remesa.company}</div>
      <div class="transaction-amount">$${remesa.amount.toLocaleString()}</div>
    `;

    const downDiv = document.createElement("div");
    downDiv.classList.add("down-transaction-button-area");
    downDiv.innerHTML = `
      <div class="date-of-transaction ${remesa.cobrado ? "" : "hidden"}">${formatearFecha(remesa.charged_at || remesa.created_at)}</div>
      <div class="is-cashed-area">
        <div class="is-cashed-text ${remesa.cobrado ? "" : "not-cashed"}">${remesa.cobrado ? "Cobrado" : "Pendiente"}</div>
        <div class="is-cashed-icon ${remesa.cobrado ? "" : "not-cashed"}">${remesa.cobrado ? "✔" : "✘"}</div>
      </div>
    `;

    remesaDiv.addEventListener("click", () => seleccionarRemesa(remesaDiv));
    remesaDiv.appendChild(upperDiv);
    remesaDiv.appendChild(downDiv);
    contenedor.appendChild(remesaDiv);
  });
}

// Función que actualiza los botones de paginación en función de la cantidad de remesas filtradas
function actualizarBotonesPaginacion() {
  const contenedorBotones = document.querySelector(".page-buttons-area");
  contenedorBotones.innerHTML = ""; // Limpiar botones existentes
  
  const totalPaginas = Math.ceil(remesasFiltradas.length / remesasPorPagina);
  
  for (let i = 1; i <= totalPaginas; i++) {
    const boton = document.createElement("button");
    boton.classList.add("page-button");
    if (i === paginaActual) boton.classList.add("selected");
    boton.textContent = i;
    boton.addEventListener("click", () => cambiarPagina(i));
    contenedorBotones.appendChild(boton);
  }
}










////sg

// Función para aplicar el filtro de búsqueda y reiniciar la paginación
function aplicarFiltro() {
    const criterio = document.getElementById("search").value;
    remesasFiltradas = buscarRemesas(remesas, criterio);
    paginaActual = 1; // Reinicia a la primera página al aplicar un nuevo filtro
    actualizarListadoRemesas();
    actualizarBotonesPaginacion();
  }
  
  // Función que actualiza el listado de remesas en la página actual
  function actualizarListadoRemesas() {
    const contenedor = document.getElementById("transaction-list");
    contenedor.innerHTML = ""; // Limpiar el contenido actual del contenedor
    
    const inicio = (paginaActual - 1) * remesasPorPagina;
    const fin = inicio + remesasPorPagina;
    const remesasPagina = remesasFiltradas.slice(inicio, fin);
    
    remesasPagina.forEach(remesa => {
      const remesaDiv = document.createElement("div");
      remesaDiv.classList.add("transaction-button-area");
  
      const upperDiv = document.createElement("div");
      upperDiv.classList.add("upper-transaction-button-area");
      upperDiv.innerHTML = `
        <div class="transaction-id">#${remesa.id}</div>
        <div class="transaction-company">${remesa.company}</div>
        <div class="transaction-amount">$${remesa.amount.toLocaleString()}</div>
      `;
  
      const downDiv = document.createElement("div");
      downDiv.classList.add("down-transaction-button-area");
      downDiv.innerHTML = `
        <div class="date-of-transaction ${remesa.cobrado ? "" : "hidden"}">${formatearFecha(remesa.charged_at || remesa.created_at)}</div>
        <div class="is-cashed-area">
          <div class="is-cashed-text ${remesa.cobrado ? "" : "not-cashed"}">${remesa.cobrado ? "Cobrado" : "Pendiente"}</div>
          <div class="is-cashed-icon ${remesa.cobrado ? "" : "not-cashed"}">${remesa.cobrado ? "✔" : "✘"}</div>
        </div>
      `;
  
      remesaDiv.addEventListener("click", () => seleccionarRemesa(remesaDiv));
      remesaDiv.appendChild(upperDiv);
      remesaDiv.appendChild(downDiv);
      contenedor.appendChild(remesaDiv);
    });
  }
  
  // Función que actualiza los botones de paginación en función de la cantidad de remesas filtradas
  function actualizarBotonesPaginacion() {
    const contenedorBotones = document.querySelector(".page-buttons-area");
    contenedorBotones.innerHTML = ""; // Limpiar botones existentes
    
    const totalPaginas = Math.ceil(remesasFiltradas.length / remesasPorPagina);
    
    for (let i = 1; i <= totalPaginas; i++) {
      const boton = document.createElement("div");
      boton.classList.add("page-button");
      if (i === paginaActual) boton.classList.add("selected");
      boton.textContent = i;
      boton.addEventListener("click", () => cambiarPagina(i));
      contenedorBotones.appendChild(boton);
    }
  }


  function rotateScreen(){
    document.getElementById("content-navigator").className+="vertical"
    document.getElementById("right-bar-inner-margin").className="vertical"
    document.getElementById("upper-navigator").className="vertical"
   document.getElementById("id-input-calculator").className="vertical"
   document.getElementById("center-navigator").className+=" hidden"



  }

  function derotateScreen(){
    document.getElementById("center-navigator").classList.remove('vertical');
    document.getElementById("right-bar-inner-margin").className=""
    document.getElementById("upper-navigator").className=""
   document.getElementById("id-input-calculator").className="hidden"
   document.getElementById("center-navigator").classList.remove('hidden');



  }

  function mediumSize(){
    document.getElementById("content-navigator").className="medium-size"
    document.getElementById("id-selector").className="medium-size"

    
  }

  function smallSize(){
     document.getElementById("content-navigator").className="small-size"
     document.getElementById("id-selector").className="small-size"

  }
  function normalSize(){
    document.getElementById("content-navigator").className=""
    document.getElementById("id-selector").className=""

 }


  function handleResize() {
    if (window.innerWidth < 1200 && window.innerWidth > 1000) {
        mediumSize()
    }else if(window.innerWidth < 1000 && window.innerWidth > 860){
        smallSize()
        derotateScreen()
        screenDirection == "horizontal"
    }
    else if(window.innerWidth < 860 && screenDirection == "horizontal"){
        normalSize()
        rotateScreen()
        screenDirection == "vertical"
    }
    else if(window.innerWidth > 860 && screenDirection == "vertical"){
        normalSize()
        derotateScreen()
        screenDirection == "horizontal"
    }
    else if(window.innerWidth > 1200){
        normalSize()
        derotateScreen()
    }
}



// Agrega el evento de escucha al redimensionar la ventana
window.addEventListener('resize', handleResize);

// Llama a handleResize una vez al cargar la página para verificar el tamaño inicial
handleResize();