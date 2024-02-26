import { Button } from '@/components'
import { PaginationProps, Remittance } from '@/interfaces'

interface Props extends PaginationProps<Remittance> { }

export const Pagination = ({ records, page, prevPage, nextPage, totalPages, totalRecords, recordsPerPage, pages }: Props) => {
    const firstRecord = (page - 1) * recordsPerPage + 1
    const lastRecord = firstRecord + records.length - 1

    return (
        <>
            <div className="pagination-container" style={{ marginBottom: '.5rem' }}>
                <h5>Mostrando remesas de la {firstRecord} a la {lastRecord} de un total de {totalRecords} remesas</h5>
            </div>
            <div className="pagination-container">
                <Button title="Anterior" color="outline-secondary" onClick={prevPage} disabled={page === 1}>
                    <i className="fa-solid fa-chevron-left"></i>
                </Button>
                {
                    pages.map(({ page, isActive, navigate }) => (
                        <Button
                            key={page}
                            title={String(page)}
                            color={isActive ? 'secondary' : 'outline-secondary'}
                            onClick={navigate}
                        />
                    ))
                }
                <Button title="Siguiente" color="outline-secondary" onClick={nextPage} disabled={page === totalPages}>
                    <i className="fa-solid fa-chevron-right"></i>
                </Button>
            </div>
        </>
    )
}