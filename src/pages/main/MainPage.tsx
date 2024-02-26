import { Button } from '@/components'
import { useAppSelector, usePagination } from '@/hooks'
import '@/pages/main/main.css'

export const MainPage = () => {
    const { isLoading, remittances } = useAppSelector(state => state.remittances)
    const { records, page, totalPages, prevPage, nextPage } = usePagination({ records: remittances, recordsPerPage: 20 })

    return (
        <div className="mainpage-container">
            <h1>Todas las remesas</h1>
            {
                isLoading ? (
                    <div className="full-center" style={{ height: '40rem' }}>
                        <i className="fa-solid fa-spin fa-spinner text-info fa-2x"></i>
                    </div>
                ) : (
                    <>
                        <table id="all-remittances-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Id</th>
                                    <th>Compañia</th>
                                    <th>Monto</th>
                                    <th>Estatus</th>
                                    <th>Fecha de creación</th>
                                    <th>Fecha de cobro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map(({ id, company, amount, status, created_at, charged_at }) => (
                                        <tr key={id}>
                                            <td><i className={`fa-solid fa-circle text-${status === 'COBRADO' ? 'success' : 'danger'}`}></i></td>
                                            <th>{id}</th>
                                            <td>{company}</td>
                                            <td>{amount}</td>
                                            <td>{status}</td>
                                            <td>{new Date(created_at).toDateString()}</td>
                                            <td>{!!charged_at ? new Date(charged_at).toDateString() : ''}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="mainpage-pagination-container">
                            <Button title="Anterior" color="outline-secondary" onClick={prevPage} disabled={page === 1}>
                                <i className="fa-solid fa-chevron-left"></i>
                            </Button>
                            <Button title="Siguiente" color="outline-secondary" onClick={nextPage} disabled={page === totalPages}>
                                <i className="fa-solid fa-chevron-right"></i>
                            </Button>
                        </div>
                    </>
                )
            }
        </div>
    )
}