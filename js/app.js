const remittanceList = document.getElementById("remittance-list");

function renderRemittances(items) {
  remittanceList.innerHTML = "";

  items.forEach((item) => {
    remittanceList.innerHTML += `
      <article class="remittance-row">
        <span>#${item.id}</span>
        <span>${item.company}</span>
        <strong>$${item.amount.toLocaleString()}</strong>
      </article>
    `;
  });
}

function getChargedRemittances() {
  return remittances
    .filter((remittance) => remittance.status === "COBRADO")
    .sort((a, b) => b.charged_at.localeCompare(a.charged_at));
}

const chargedRemittances = getChargedRemittances();

renderRemittances(chargedRemittances);
