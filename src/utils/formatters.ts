import type { Remesa } from "@/src/types/remesa";

/**
 * Formatea un número como moneda mexicana
 * @param amount - Monto a formatear
 * @returns String formateado como moneda (ej: $12,000.00)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea una fecha ISO a formato legible
 * @param dateString - Fecha en formato ISO o YYYYMMDD
 * @returns String formateado (ej: 03/12/2023)
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  // Si viene en formato YYYYMMDD, convertir a Date
  if (dateString.length === 8 && /^\d{8}$/.test(dateString)) {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("es-MX");
  }
  
  // Si viene en formato ISO
  const date = new Date(dateString);
  return date.toLocaleDateString("es-MX");
}

/**
 * Obtiene la fecha actual en formato ISO
 * @returns String con fecha actual en formato ISO
 */
export function getCurrentDateISO(): string {
  return new Date().toISOString();
}

/**
 * Obtiene la fecha actual en formato YYYYMMDD
 * @returns String con fecha actual en formato YYYYMMDD
 */
export function getCurrentDateYYYYMMDD(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * Ordena remesas por charged_at descendente
 * @param remesas - Array de remesas
 * @returns Array ordenado por charged_at DESC
 */
export function sortByChargedAtDesc(remesas: Remesa[]): Remesa[] {
  return [...remesas].sort((a, b) => {
    if (!a.charged_at && !b.charged_at) return 0;
    if (!a.charged_at) return 1;
    if (!b.charged_at) return -1;
    return b.charged_at.localeCompare(a.charged_at);
  });
}

/**
 * Filtra remesas por status COBRADO
 * @param remesas - Array de remesas
 * @returns Array filtrado solo con remesas cobradas
 */
export function filterChargedRemesas(remesas: Remesa[]): Remesa[] {
  return remesas.filter((remesa) => remesa.status === "COBRADO");
}

