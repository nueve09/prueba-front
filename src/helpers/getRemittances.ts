import { waitForSeconds } from '@/helpers'
import { Remittance } from '@/interfaces'

// genera un id aleatorio entre 10000000 y 99999999 (8 caracteres)
const generateRandomId = (): string => String(Math.floor(Math.random() * 90000000) + 10000000)

// elige una compañia aleatoria del arreglo
const generateRandomCompany = (): string => {
    const COMPANIES = ['Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'IBM', 'Intel', 'Cisco', 'Vercel']

    return COMPANIES[Math.floor(Math.random() * COMPANIES.length)]
}

// genera el time de una fecha entre 1-1-2019 y el 1-1-2023
const generateRandomDate = (): number => {
    const start = new Date('2019-01-01').getTime()
    const end = new Date('2023-01-01').getTime()

    return Math.floor(start + Math.random() * (end - start))
}

// obtiene un arreglo de 50 remesas y demora almenos 2 segundos
export const getRemittances = async (): Promise<Remittance[]> => {
    let remittances: Remittance[] = []

    for (let i = 0; i < 50; i++) {
        const remittance: Remittance = {
            id: generateRandomId(),
            company: generateRandomCompany(),
            amount: Number((Math.random() * 10000).toFixed(2)), // genera un monto aleatorio entre 0 y 10000 con dos decimales
            status: 'NO_COBRADO',
            created_at: generateRandomDate(),
            charged_at: 0
        }

        remittances.push(remittance)
    }

    await waitForSeconds(2)

    return remittances
}