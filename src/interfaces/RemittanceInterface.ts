export interface Remittance {
    id: string
    company: string
    amount: number
    status: 'NO_COBRADO' | 'COBRADO'
    created_at: number
    charged_at: number | null
}