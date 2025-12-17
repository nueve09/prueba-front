import type { Remesa } from "@/src/types/remesa";

/**
 * Valida el formato del ID
 * @param id - ID a validar
 * @returns true si es válido (max 8 caracteres)
 */
export function validateIdFormat(id: string): boolean {
  return id.length > 0 && id.length <= 8;
}

/**
 * Valida que todos los campos obligatorios estén presentes
 * @param remesa - Objeto remesa a validar
 * @returns true si todos los campos requeridos están presentes
 */
export function validateRequiredFields(remesa: Partial<Remesa>): boolean {
  return !!(
    remesa.id &&
    remesa.company &&
    remesa.amount !== undefined &&
    remesa.status &&
    remesa.created_at
  );
}

/**
 * Valida si una remesa ya fue cobrada
 * @param remesa - Remesa a verificar
 * @returns true si ya está cobrada
 */
export function isRemesaCharged(remesa: Remesa): boolean {
  return remesa.status === "COBRADO" && !!remesa.charged_at;
}

/**
 * Valida que el monto sea numérico y válido
 * @param amount - Monto a validar
 * @returns true si es un número válido mayor a 0
 */
export function validateAmount(amount: number): boolean {
  return typeof amount === "number" && amount > 0 && !isNaN(amount);
}

/**
 * Valida si un ID existe en la lista de remesas
 * @param id - ID a buscar
 * @param remesas - Lista de remesas
 * @returns La remesa encontrada o undefined
 */
export function findRemesaById(id: string, remesas: Remesa[]): Remesa | undefined {
  return remesas.find((remesa) => remesa.id === id);
}

