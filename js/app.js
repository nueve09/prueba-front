const remittanceList = document.getElementById("remittance-list");
const pagination = document.getElementById("pagination");

const calculatorValue = document.getElementById("calculator-value");
const numberButtons = document.querySelectorAll(
  ".calculator__key[data-value]",
);
const deleteButton = document.getElementById("delete-button");
const submitButton = document.getElementById("submit-button");

const globalMessage = document.getElementById("global-message");
const globalMessageText = document.getElementById(
  "global-message-text",
);

/* Estado */

const itemsPerPage = 5;
const maxIdLength = 8;

let currentPage = 1;
let currentId = "";

/* Mensajes */

function showMessage(message) {
  globalMessageText.textContent = message;
  globalMessage.hidden = false;
}

function hideMessage() {
  globalMessageText.textContent = "";
  globalMessage.hidden = true;
}

/* Render de remesas */

function renderRemittances(items) {
  remittanceList.innerHTML = "";

  if (items.length === 0) {
    remittanceList.innerHTML = `
      <p class="remittance-list__empty">
        No hay remesas cobradas para mostrar.
      </p>
    `;
    return;
  }

  items.forEach((item) => {
    remittanceList.innerHTML += `
      <article class="remittance-row">
        <span>#${item.id}</span>
        <span>${item.company}</span>
        <strong>${formatCurrency(item.amount)}</strong>
      </article>
    `;
  });
}

/* Paginación */

function renderPagination(totalItems) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return;
  }

  const previousButton = document.createElement("button");

  previousButton.type = "button";
  previousButton.innerHTML =
    '<i class="fa-solid fa-chevron-left"></i>';
  previousButton.setAttribute("aria-label", "Página anterior");
  previousButton.disabled = currentPage === 1;

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderCurrentPage();
    }
  });

  pagination.appendChild(previousButton);

  for (let page = 1; page <= totalPages; page += 1) {
    const pageButton = document.createElement("button");

    pageButton.type = "button";
    pageButton.textContent = page;
    pageButton.setAttribute(
      "aria-label",
      `Ir a la página ${page}`,
    );

    if (page === currentPage) {
      pageButton.classList.add("pagination__page--active");
      pageButton.setAttribute("aria-current", "page");
    }

    pageButton.addEventListener("click", () => {
      currentPage = page;
      renderCurrentPage();
    });

    pagination.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");

  nextButton.type = "button";
  nextButton.innerHTML =
    '<i class="fa-solid fa-chevron-right"></i>';
  nextButton.setAttribute("aria-label", "Página siguiente");
  nextButton.disabled = currentPage === totalPages;

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderCurrentPage();
    }
  });

  pagination.appendChild(nextButton);
}

function renderCurrentPage() {
  const chargedRemittances = getChargedRemittances(remittances);

  const totalPages = Math.ceil(
    chargedRemittances.length / itemsPerPage,
  );

  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  const pageItems = getPageItems(
    chargedRemittances,
    currentPage,
    itemsPerPage,
  );

  renderRemittances(pageItems);
  renderPagination(chargedRemittances.length);
}

/* Calculadora */

function updateCalculatorDisplay() {
  calculatorValue.textContent = currentId || "--------";
}

function addNumber(value) {
  if (currentId.length >= maxIdLength) {
    showMessage(
      `El ID debe tener máximo ${maxIdLength} caracteres.`,
    );
    return;
  }

  hideMessage();

  currentId += value;
  updateCalculatorDisplay();
}

function deleteLastNumber() {
  currentId = currentId.slice(0, -1);

  hideMessage();
  updateCalculatorDisplay();
}

/* Cobro de remesa */

function chargeRemittance() {
  const validationError = validateRemittanceId(
    currentId,
    maxIdLength,
  );

  if (validationError) {
    showMessage(validationError);
    return;
  }

  const remittance = remittances.find(
    (item) => item.id === currentId,
  );

  if (!remittance) {
    showMessage("No existe una remesa con ese ID.");
    return;
  }

  if (remittance.status === "COBRADO") {
    showMessage("Esta remesa ya fue cobrada.");
    return;
  }

  remittance.status = "COBRADO";
  remittance.charged_at = getCurrentDate();

  currentId = "";
  currentPage = 1;

  hideMessage();
  updateCalculatorDisplay();
  renderCurrentPage();
}

/* Eventos */

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addNumber(button.dataset.value);
  });
});

deleteButton.addEventListener("click", deleteLastNumber);
submitButton.addEventListener("click", chargeRemittance);

/* Inicio de la aplicación */

updateCalculatorDisplay();
renderCurrentPage();
