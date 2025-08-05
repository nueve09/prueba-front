import { REMESA_STATUS, COMPANIES } from '../shared/constants';

export const initialRemesas = [
  {
    id: '12345678',
    company: COMPANIES[0], 
    amount: '12000',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231001',
    charged_at: '20231003' 
  },
  {
    id: '87654321',
    company: COMPANIES[1],
    amount: '8500',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231002',
    charged_at: '20231004' 
  },
  {
    id: '11223344',
    company: COMPANIES[0], 
    amount: '15000',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231003',
    charged_at: '20231005' 
  },
  {
    id: '44332211',
    company: COMPANIES[2], 
    amount: '6750',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231004',
    charged_at: '20231006' 
  },
  {
    id: '55667788',
    company: COMPANIES[0],
    amount: '12000',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231005',
    charged_at: '20231007' 
  },
  {
    id: '99887766',
    company: COMPANIES[3], 
    amount: '9200',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231006',
    charged_at: '20231008' 
  },
  {
    id: '13579246',
    company: COMPANIES[0], 
    amount: '12000',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231007',
    charged_at: '20231009' 
  },
  {
    id: '24681357',
    company: COMPANIES[4], 
    amount: '18500',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231008',
    charged_at: '20231010' 
  },
  {
    id: '36925814',
    company: COMPANIES[0], 
    amount: '12000',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231009',
    charged_at: '20231011' 
  },
  {
    id: '14785236',
    company: COMPANIES[5], 
    amount: '7300',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231010',
    charged_at: '20231012' 
  },
  {
    id: '96385274',
    company: COMPANIES[0], 
    amount: '12000',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231011',
    charged_at: '20231013' 
  },
  {
    id: '75319864',
    company: COMPANIES[1], 
    amount: '11200',
    status: REMESA_STATUS.COBRADO,
    created_at: '20231012',
    charged_at: '20231014' 
  },
  // Remesas NO cobradas para testing 
  {
    id: '29033003',
    company: COMPANIES[0], 
    amount: '12000',
    status: REMESA_STATUS.NO_COBRADO,
    created_at: '20231013',
    charged_at: null 
  },
  {
    id: '85274196',
    company: COMPANIES[2], 
    amount: '9800',
    status: REMESA_STATUS.NO_COBRADO,
    created_at: '20231014',
    charged_at: null 
  },
  {
    id: '63951847',
    company: COMPANIES[3], 
    amount: '14500',
    status: REMESA_STATUS.NO_COBRADO,
    created_at: '20231015',
    charged_at: null // No cobrada aún
  }
];

// Función para obtener remesas cobradas ordenadas por fecha de cobro (charged_at)
export const getChargedRemesas = (remesas) => {
  return remesas
    .filter(remesa => remesa.status === REMESA_STATUS.COBRADO && remesa.charged_at !== null)
    .sort((a, b) => a.charged_at.localeCompare(b.charged_at));
};

// Función para buscar remesas
export const searchRemesas = (remesas, searchTerm) => {
  if (!searchTerm) return remesas;
  
  const term = searchTerm.toLowerCase();
  return remesas.filter(remesa => 
    remesa.id.toLowerCase().includes(term) ||
    remesa.company.toLowerCase().includes(term) ||
    remesa.amount.includes(term)
  );
};
