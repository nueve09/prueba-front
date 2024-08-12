export function formatDateToSpanishString(date) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("es-ES", options).format(date);
}

export function formattedAmount(amount) {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return "Invalid amount";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericAmount);
}
