const modal = document.getElementById("modalId");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const span = document.querySelector(".close");

/**
 * Función para mostrar modal
 * @param {*} title título que mostrará el modal
 */
export function showModal(title, children) {
  modalTitle.textContent = title;
  modalBody.innerHTML = children;
  modal.style.display = "block";
}

// Cerrar modal al hacer clic en "x"
span.onclick = () => {
  modal.style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
