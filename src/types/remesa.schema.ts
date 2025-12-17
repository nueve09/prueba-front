import { z } from "zod";
import type { Remesa } from "./remesa";

/**
 * Esquema de validación Zod para Remesa
 * Valida todos los campos según las reglas de negocio
 */
export const RemesaSchema = z.object({
  id: z.string().max(8, "El ID no puede exceder 8 caracteres"),
  company: z.string().min(1, "La compañía es requerida"),
  amount: z.number().min(1, "El monto debe ser mayor a 0"),
  status: z.enum(["COBRADO", "NO_COBRADO"]),
  created_at: z.string(),
  charged_at: z.string().optional()
});

/**
 * Tipo inferido desde el schema de Zod
 * Garantiza que los datos cumplan con la validación
 */
export type RemesaValidated = z.infer<typeof RemesaSchema>;

/**
 * Valida una remesa usando el schema de Zod
 * @param data - Datos a validar
 * @returns Objeto con success y data/error
 */
export function validateRemesa(data: unknown): { success: boolean; data?: Remesa; error?: z.ZodError } {
  const result = RemesaSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, error: result.error };
}

