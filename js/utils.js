function formatCurrency(amount) {
  return amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
}

function getChargedRemittances(items) {
  return items
    .filter(
      (remittance) =>
        remittance.status === "COBRADO" && remittance.charged_at,
    )
    .sort((a, b) => b.charged_at.localeCompare(a.charged_at));
}

function getPageItems(items, page, itemsPerPage) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return items.slice(startIndex, endIndex);
}

function validateRemittanceId(id, maxLength) {
  if (!id) {
    return "Ingresa el ID de una remesa.";
  }

  if (!/^\d+$/.test(id)) {
    return "El ID solo puede contener números.";
  }

  if (id.length > maxLength) {
    return `El ID debe tener máximo ${maxLength} caracteres.`;
  }

  return null;
}

function getCurrentDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}
