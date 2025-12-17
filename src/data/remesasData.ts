import type { Remesa } from "@/src/types/remesa";
import { validateRemesa } from "@/src/types/remesa.schema";

/**
 * Datos dummy de remesas
 * Más de 12 registros para probar paginación y búsqueda
 */
const rawRemesasData: unknown[] = [
  {
    id: "A001",
    company: "Western Union",
    amount: 12000,
    status: "NO_COBRADO",
    created_at: "20231201",
    charged_at: "20231203",
  },
  {
    id: "A002",
    company: "Western Union",
    amount: 8000,
    status: "NO_COBRADO",
    created_at: "20231202",
  },
  {
    id: "A003",
    company: "Western Union",
    amount: 15000,
    status: "NO_COBRADO",
    created_at: "20231203",
  },
  {
    id: "A004",
    company: "Western Union",
    amount: 5000,
    status: "COBRADO",
    created_at: "20231204",
    charged_at: "20231205",
  },
  {
    id: "A005",
    company: "Western Union",
    amount: 9000,
    status: "COBRADO",
    created_at: "20231205",
    charged_at: "20231205",
  },
  {
    id: "A006",
    company: "Western Union",
    amount: 6000,
    status: "NO_COBRADO",
    created_at: "20231206",
  },
  {
    id: "A007",
    company: "Western Union",
    amount: 7000,
    status: "COBRADO",
    created_at: "20231206",
    charged_at: "20231207",
  },
  {
    id: "A008",
    company: "Western Union",
    amount: 4000,
    status: "NO_COBRADO",
    created_at: "20231207",
  },
  {
    id: "A009",
    company: "Western Union",
    amount: 13000,
    status: "COBRADO",
    created_at: "20231207",
    charged_at: "20231208",
  },
  {
    id: "A010",
    company: "Western Union",
    amount: 14000,
    status: "NO_COBRADO",
    created_at: "20231208",
  },
  {
    id: "A011",
    company: "Western Union",
    amount: 10000,
    status: "COBRADO",
    created_at: "20231208",
    charged_at: "20231208",
  },
  {
    id: "A012",
    company: "Western Union",
    amount: 16000,
    status: "NO_COBRADO",
    created_at: "20231208",
  },
  {
    id: "B001",
    company: "Western Union",
    amount: 11000,
    status: "COBRADO",
    created_at: "20231209",
    charged_at: "20231210",
  },
  {
    id: "B002",
    company: "Western Union",
    amount: 9500,
    status: "COBRADO",
    created_at: "20231209",
    charged_at: "20231209",
  },
  {
    id: "B003",
    company: "Western Union",
    amount: 3500,
    status: "NO_COBRADO",
    created_at: "20231210",
  },
  {
    id: "B004",
    company: "Western Union",
    amount: 18000,
    status: "COBRADO",
    created_at: "20231210",
    charged_at: "20231211",
  },
];

/**
 * Remesas validadas con Zod
 * Solo se incluyen las que pasan la validación
 */
export const remesasData: Remesa[] = rawRemesasData
  .map((item) => {
    const validation = validateRemesa(item);
    if (validation.success && validation.data) {
      return validation.data;
    }
    console.warn("Remesa inválida:", item, validation.error?.issues);
    return null;
  })
  .filter((item): item is Remesa => item !== null);

