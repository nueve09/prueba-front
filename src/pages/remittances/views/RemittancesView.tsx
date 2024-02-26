import { Button } from '@/components'
import { Pagination, FilterBar } from '@/pages/remittances/components'
import { USER } from '@/utils/constants'
import '@/pages/remittances/views/remittancesList.css'
import { useAppDispatch, useAppSelector, usePagination } from '@/hooks'
import { setFilterOrder } from '@/store/remittances'

interface Props {
    isOpenCalculator: boolean
    openCalculator: (open: boolean) => void
}

export const RemittancesView = ({ isOpenCalculator, openCalculator }: Props) => {
    const { isLoading, filterOrder, filteredRemittances: remittances } = useAppSelector(state => state.remittances)
    const dispatch = useAppDispatch()
    const { records, ...pagination } = usePagination({ records: remittances, recordsPerPage: 10 })

    const sortRemittances = () => dispatch(setFilterOrder(filterOrder === 'ASC' ? 'DESC' : 'ASC'))

    return (
        <div className="remittances-list-container" style={{ width: isOpenCalculator ? '40%' : '100%' }}>
            <div className="remittances-nav-container">
                <Button title="Nofificaciones" color="light" circle>
                    <div style={{ position: 'relative' }}>
                        <i className="fa-regular fa-bell"></i>
                        <div style={{ position: 'absolute', backgroundColor: 'var(--danger)', borderRadius: '50%', fontSize: '11px', color: 'var(--white)', top: '-.5rem', right: '-.75rem', height: '1rem', width: '1rem' }}>2</div>
                    </div>
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <i className="fa-solid fa-user" style={{ height: '2.5rem', width: '2.5rem', backgroundColor: 'var(--light)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></i>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem', gap: '.5rem' }}>
                        <div>
                            <h4>{USER.name}</h4>
                            <h5><b>{USER.role}</b></h5>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                </div>
            </div>
            <div className="remittances-title-container">
                <div>
                    <h3 className="text-primary"><b>Hoy</b></h3>
                    <h4><b>{new Date().toDateString()}</b></h4>
                </div>
                <Button title="Abrir teclado" color="primary" circle onClick={() => openCalculator(!isOpenCalculator)}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '.5rem 0 .5rem 0' }}>
                        {!isOpenCalculator && (<i className="fa-solid fa-angle-up fa-xs" style={{ width: '100%', textAlign: 'center', marginBottom: '.25rem' }}></i>)}
                        <i className="fa-solid fa-keyboard" style={{ width: '100%', textAlign: 'center' }}></i>
                        {isOpenCalculator && (<i className="fa-solid fa-angle-down fa-xs" style={{ width: '100%', textAlign: 'center', marginTop: '.25rem' }}></i>)}
                    </div>
                </Button>
            </div>
            {
                isLoading ? (
                    <div className="full-center" style={{ height: '40rem' }}>
                        <i className="fa-solid fa-spin fa-spinner text-info fa-2x"></i>
                    </div>
                ) : (
                    <>
                        <div className="table-controls">
                            <FilterBar />
                            <Button title="Ordenar por fecha de cobro" color="outline-primary" onClick={sortRemittances}>
                                <i className={`fa-solid fa-arrow-up-${filterOrder === 'ASC' ? 'short-wide' : 'wide-short'}`}></i>
                            </Button>
                            <Button title="Imprimir" color="outline-primary">
                                <i className="fa-solid fa-print"></i>
                            </Button>
                        </div>
                        <table id="remittances-table">
                            <tbody>
                                {
                                    records.map(({ id, company, amount }) => (
                                        <tr key={id}>
                                            <th>#{id}</th>
                                            <td>{company}</td>
                                            <td style={{ textAlign: 'right' }}>{amount}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination records={records} {...pagination} />
                    </>
                )
            }
        </div>
    )
}