import type { Remittance } from '../types/Remittance';

const formatAmount = (amount: number): string =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const escapeHtml = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const printRemittanceList = (remittances: Remittance[]): boolean => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return false;

  const rows = remittances
    .map(
      ({ id, company, amount }) =>
        `<tr><td>#${escapeHtml(id)}</td><td>${escapeHtml(company)}</td><td>${formatAmount(amount)}</td></tr>`,
    )
    .join('');

  printWindow.document.write(`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Lista de remesas</title>
    <style>
      body { color: #202020; font-family: Arial, sans-serif; margin: 2rem; }
      h1 { font-size: 1.25rem; margin-bottom: 1.5rem; }
      table { border-collapse: collapse; width: 100%; }
      th, td { border-bottom: 1px solid #dedde2; padding: 0.75rem; text-align: left; }
      th:last-child, td:last-child { text-align: right; }
    </style>
  </head>
  <body>
    <h1>Lista de remesas</h1>
    <table>
      <thead><tr><th>ID</th><th>Compañía</th><th>Monto</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </body>
</html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  return true;
};
