import { useEffect, useState } from 'react'
import { getRemittances } from '@/helpers'
import { Remittance } from '@/interfaces'

export const App = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [remittances, setRemittances] = useState<Remittance[]>([])

    useEffect(() => {
        searchRemittances()
    }, [])

    const searchRemittances = async () => {
        setIsLoading(true)

        const remittances = await getRemittances()

        setRemittances(remittances)
        setIsLoading(false)
    }

    return (
        <>
            <div>App</div>
            {
                isLoading ? (<p>Cargando...</p>) : (
                    <pre>{JSON.stringify(remittances, null, 4)}</pre>
                )
            }
        </>
    )
}