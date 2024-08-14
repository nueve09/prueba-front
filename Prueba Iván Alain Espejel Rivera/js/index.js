let remesas = [
  {
    id: "12121212",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231201",
    charged_at: "",
  },
  {
    id: "20240802",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231202",
  },
  {
    id: "20240803",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240804",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240805",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240805",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240807",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240808",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240809",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240810",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240811",
    company: "BBVA",
    amount: "12000",
    status: "NO_COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240812",
    company: "BBVA",
    amount: "12000",
    status: "NO_COBRADO",
    created_at: "20231220",
    charged_at: "20231203",
  },
  {
    id: "20240813",
    company: "BBVA",
    amount: "12000",
    status: "NO_COBRADO",
    created_at: "20231220",
    charged_at: "20231220",
  },
  {
    id: "20240814",
    company: "BBVA",
    amount: "12000",
    status: "COBRADO",
    created_at: "20231220",
    charged_at: "20231226",
  },
];
// Contenedor lista de Remesas
let contenedor = document.getElementById("ContenedorLista");
// Ventana modal
var modal = document.getElementById("ventanaModal");

// Botón que abre el modal
var boton = document.getElementById("abrirModal");

// Hace referencia al elemento <span> que tiene la X que cierra la ventana
var span = document.getElementsByClassName("cerrar")[0];
// Contenedor Cambio de Datos con estado no cobrado
let contenedorEstado = document.getElementById("contenedorEstado");

window.onload = function(){
  let lista = remesas.sort((a, b) => a.charged_at - b.charged_at);
  lista = lista.filter((buscar) => buscar.status == "COBRADO");
  contenedor.innerHTML = "";
  render(lista);
}

function recarga(){
  let lista = remesas.sort((a, b) => a.charged_at - b.charged_at);
  lista = lista.filter((buscar) => buscar.status == "COBRADO");
  contenedor.innerHTML = "";
  render(lista);
}


function cambiarValidaciones() {
  const select = document.getElementById("filtrosBusqueda");
  const input = document.getElementById("entradaBusqueda");
  let etiqueta = document.getElementById("busquedaLabel");
  document.getElementById("entradaBusqueda").value = "";
  console.log(select.value);
  switch (select.value) {
    case "id":
      input.maxlength = "8";
      input.pattern = "[0-9][^a-zA-Z]*"; // solo números
      etiqueta.textContent = "Este campo solo admite números";
      input.placeholder = "Ingrese un ID";
      break;
    case "company":
      input.maxlength = "12";
      input.pattern = "[a-zA-Z]+"; // solo letras
      etiqueta.textContent = "Este campo solo admite letras";
      input.placeholder = "Ingrese una Compañia";
      break;
    case "amount":
      input.maxlength = "16";
      input.pattern = "[0-9][^a-zA-Z]*"; // solo números
      etiqueta.textContent = "Este campo solo admite números";
      input.placeholder = "Ingrese una Monto";
      break;
    default:
      input.pattern = "[0-9][^a-zA-Z]*"; // solo números
      input.title = "solo números";
  }
}

function valida(datos) {
  let inputEntrada = document.getElementById("entradaBusqueda");
  let alerta = document.getElementById("busquedaLabel");
  const isValid = inputEntrada.reportValidity();
  console.log(inputEntrada);
  if(inputEntrada.value == ""){
    alerta.textContent = "El campo esta vacío";
    alerta.hidden = false;
  }
  else if (isValid == false) {
    alerta.textContent = "Este campo solo admite números";
    alerta.hidden = false;
  } 
 
  else {
    alerta.hidden = true;
    buscar(datos);
  }
}

function ingresar(digito) {
  let pantalla = document.getElementById("EntradaCalculadora");
  let alerta = document.getElementById("alertaPantalla");
  let caracteres = pantalla.value.length;
  console.log(caracteres);
  
if (caracteres <= 7) {
    if (pantalla.value == "") {
      pantalla.value = digito;
      alerta.hidden = true;
    } else {
      pantalla.value = pantalla.value + digito;
      alerta.hidden = true;
    }
  } else {
    alerta.textContent = "La longituda máxima del id es de 8 digitos";
    alerta.hidden = false;
  }
}

function ValidaCalcu(valor){
  let pantalla = document.getElementById("EntradaCalculadora");
  let alerta = document.getElementById("alertaPantalla");
  if(pantalla.value ==""){
    alerta.textContent = "El campo esta vacío";
    alerta.hidden = false;
  }
  else{
    busquedaID(valor);
  }
}

function buscar(tipoBusqueda) {
  let parametro = document.getElementById("entradaBusqueda").value;
  document.getElementById("entradaBusqueda").value = "";
  if (parametro == "") {
    console.log("el campo esta vacío");
  } else {
    if (tipoBusqueda == "id") {
     console.log(tipoBusqueda);
      busquedaID(parametro);
    } else if (tipoBusqueda == "company") {
      busquedaCompany(parametro);
    } else if (tipoBusqueda == "amount");
    {
      busquedaAmount(parametro);
    }
  }
}

function busquedaID(valor) {
  contenedor.innerHTML = "";
    let limpiar = document.getElementById("EntradaCalculadora");
    limpiar.value = "";
    let busqueda = remesas.filter((remesa) => remesa.id.includes(valor));
    console.log(busqueda.length);
    console.log(busqueda);
  if (busqueda.length == 0) {
    busquedaNula();
    console.log("no se puede")
  } else {
    let estado = busqueda.find(estado => estado.status === "NO_COBRADO");
    
    if(estado  !==  undefined){
      console.log(estado);
      listaEstado(estado);
    }

    else{
    
    console.log(valor);
    console.log(busqueda);
    render(busqueda);}
  }
}

function busquedaCompany(valor) {
    let busqueda = remesas.filter((remesa) => remesa.company.includes(valor));
    console.log(busqueda.length);
    console.log(busqueda);
  if (busqueda.length == 0) {
    busquedaNula();
    console.log("no se puede")
  } else {
    let estado = busqueda.find(estado => estado.status === "NO_COBRADO");
    
    if(estado  !==  undefined){
      console.log(estado);
      listaEstado(estado);
    }

    else{
    
    console.log(valor);
    console.log(busqueda);
    render(busqueda);}
  }
}

function busquedaAmount(valor) {
    let busqueda = remesas.filter((remesa) => remesa.amount.includes(valor));
    console.log(busqueda.length);
    console.log(busqueda);
  if (busqueda.length == 0) {
    busquedaNula();
    console.log("no se puede")
  } else {
    let estado = busqueda.find(estado => estado.status === "NO_COBRADO");
    
    if(estado  !==  undefined){
      console.log(estado);
      listaEstado(estado);
    }

    else{
    
    console.log(valor);
    console.log(busqueda);
    render(busqueda);}
  }
}

const tamanoPagina = 10;
const numPaginas = Math.ceil(remesas.length/tamanoPagina);
let indicePagina = 0;

function render(busqueda) {
  contenedor.innerHTML = "";
  const inicio = indicePagina * tamanoPagina;
  const fin = inicio + tamanoPagina;
  console.log(inicio+""+fin);
  busqueda = busqueda.sort((a, b) => a.charged_at - b.charged_at);
  busqueda = busqueda.filter((buscar) => buscar.status == "COBRADO");
  let elementosPagina = busqueda.slice(inicio,fin);
  elementosPagina.forEach((dato, index) => {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    h2.textContent = "ID:" + "" + dato.id;
    p1.textContent = "Compañia:" + "" + dato.company;
    p2.textContent = "Monto:" + "" + dato.amount;

    div.classList.add("objetos");

    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2);
    contenedor.appendChild(div);
  });

  document.getElementById('siguiente').addEventListener('click', () => cambiarPagina('siguiente',busqueda));
document.getElementById('anterior').addEventListener('click', () => cambiarPagina('anterior',busqueda));
}

function cambiarPagina(direccion,objeto){
  if(direccion === "siguiente" && indicePagina < numPaginas - 1){
    indicePagina++;
  }else if(direccion === "anterior" && indicePagina > 0){
    indicePagina--;
  }
  render(objeto);
}

function busquedaNula() {
    let alertaNula = document.getElementById("alertaNula");
    modal.style.display = "block";
    alertaNula.style.display = "block";
    console.log("llego aqui");
}

function borrar(){
    campo = document.getElementById("EntradaCalculadora").value;
    const newCampo = campo.slice(0, -1);
    document.getElementById("EntradaCalculadora").value = newCampo;
}


// Si el usuario hace click en la x, la ventana se cierra
span.addEventListener("click",function() {
  modal.style.display = "none";
  alertaNula.style.display = "none";
  contenedorEstado.style.display = "none";
});

// Si el usuario hace click fuera de la ventana, se cierra.
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    alertaNula.style.display = "none";
    contenedorEstado.style.display = "none";
  }
});



function LimpiarCambio(){
  let idEdo = document.getElementById("idCambioe");
let CompEdo = document.getElementById("CompanyCambioe");
let MontoEdo = document.getElementById("MontoCambioe");
let FechaNueva =  document.getElementById("fechaCobro");
  idEdo.textContent = "Id;";
  CompEdo.textContent = "Compañia";
  MontoEdo.textContent = "Monto";
  document.getElementById("fechaCobro").value = "";
}


function listaEstado(objeto){
let idEdo = document.getElementById("idCambioe");
let CompEdo = document.getElementById("CompanyCambioe");
let MontoEdo = document.getElementById("MontoCambioe");
let FechaNueva =  document.getElementById("fechaCobro").value;
console.log(objeto.id);
let boton = document.getElementById("ActFecha");
modal.style.display = "block";
contenedorEstado.style.display = "block";
idEdo.textContent = idEdo.textContent +" "+ objeto.id;
CompEdo.textContent = CompEdo.textContent  +" "+ objeto.company;
MontoEdo.textContent = MontoEdo.textContent +" "+ objeto.amount;
boton.addEventListener("click", function() {
  let estado = remesas.find(estado => estado.id === objeto.id && estado.created_at === objeto.created_at && estado.amount === objeto.amount );
  if(estado){
    estado.charged_at = FechaNueva;
    estado.status = "COBRADO";
    modal.style.display = "none";
    contenedorEstado.style.display = "none";
    console.log(remesas);
    recarga();
    LimpiarCambio();
  }
});
}

