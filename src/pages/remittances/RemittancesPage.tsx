import { useState } from 'react'
import { CalculatorView, RemittancesView } from '@/pages/remittances'
import '@/pages/remittances/views/remittances.css'

export const RemittancesPage = () => {
    const [isOpenCalculator, setIsOpenCalculator] = useState(true)

    return (
        <div className="remittances-container">
            {isOpenCalculator && (<CalculatorView />)}
            <RemittancesView
                isOpenCalculator={isOpenCalculator}
                openCalculator={setIsOpenCalculator}
            />
        </div>
    )
}