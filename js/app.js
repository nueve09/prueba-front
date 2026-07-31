const remittanceList = document.getElementById("remittance-list");
const pagination = document.getElementById("pagination");

const itemsPerPage = 5;
let currentPage = 1;

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
        <strong>$${item.amount.toLocaleString("es-MX")}</strong>
      </article>
    `;
  });
}

function getChargedRemittances() {
  return remittances
    .filter(
      (remittance) =>
        remittance.status === "COBRADO" && remittance.charged_at
    )
    .sort((a, b) => b.charged_at.localeCompare(a.charged_at));
}

function getPageItems(items, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return items.slice(startIndex, endIndex);
}

function renderPagination(totalItems) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return;
  }

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
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
    pageButton.setAttribute("aria-label", `Ir a la página ${page}`);

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
  nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
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
  const chargedRemittances = getChargedRemittances();
  const totalPages = Math.ceil(
    chargedRemittances.length / itemsPerPage
  );

  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  const pageItems = getPageItems(
    chargedRemittances,
    currentPage
  );

  renderRemittances(pageItems);
  renderPagination(chargedRemittances.length);
}

renderCurrentPage();
