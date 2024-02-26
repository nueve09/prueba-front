export interface Remesa {
    id: number
    company: string
    amount: number
    status: 'NO_COBRADO' | 'COBRADO'
    created_at: Date
    charged_at?: Date
  }