import { mockData } from "../mocks/data";
import { formatDate, formatMoney } from "../utils/helpers";
import { showModal } from "./modal";

const input = document.getElementById("transferId");
const buttons = document.querySelectorAll(".keypad button");
const enterBtn = document.getElementById("enter");
const backspaceBtn = document.getElementById("backspace");

// Solo permite números en teclado físico y máximo 8
input.addEventListener("input", () => {
  input.value = input.value.replace(/\D/g, '').slice(0,8); 
});

// Función para presionar número
function pressNumber(num) {
  if (input.value.length < 8) {
    input.value += num;
  }

  const btn = document.querySelector(`.keypad button[data-num='${num}']`);
  if (btn) {
    btn.classList.add("active");            // efecto visual
    setTimeout(() => btn.classList.remove("active"), 150); // remover después de 150ms
  }
}

// Agrega números al input desde botones
buttons.forEach(btn => {
  const num = btn.dataset.num;
  if (num !== undefined) {
    btn.addEventListener("click", () => pressNumber(num));
  }
});

// Botón de acción para buscar remesa y cambiar estatus a cobrada
enterBtn.addEventListener("click", () => {
	if (!input.value) {
		showModal("Error", `<p>Ingrese datos</p>`)
	} 
	const transferFound = mockData.find((data) => data.id === input.value);
	if (!transferFound)
		showModal("Error", `<p>No se encontró información para esta remesa, intente con otro ID</p>`)
	else 
		showModal(
			'Remesa COBRADA', 
			`<p>ID: <b>#${transferFound.id} </b></p>
			<p>Estado: <b>COBRADA</b></p>
			<p>Fecha de creación: <b>${formatDate(transferFound.created_at)} </b></p>
			<p>Monto: <b>${formatMoney(transferFound.amount)}</b></p>
			<p>Fecha de cobro: <b>${new Date().toLocaleDateString()} </b></p>`
		)
});

// Botón de retroceso
backspaceBtn.addEventListener("click", () => {
  input.value = input.value.slice(0, -1);
});

// Detectar teclado físico
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    pressNumber(e.key); 
    e.preventDefault();   
  } else if (e.key === "Backspace") {
    input.value = input.value.slice(0, -1);
		e.preventDefault();   
  } else if (e.key === "Delete") {
    input.value = "";
  }
});