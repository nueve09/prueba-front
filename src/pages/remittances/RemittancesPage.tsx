import { CalculatorView, RemittancesView } from '@/pages/remittances'
import '@/pages/remittances/views/remittances.css'

export const RemittancesPage = () => {
    return (
        <div className="remittances-container">
            <CalculatorView />
            <RemittancesView />
        </div>
    )
}