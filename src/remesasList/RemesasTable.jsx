import React from "react";

export function RemesasTable({remesasList = []}) {
    const [rowsPageNum] = React.useState(10);
    const [pagination, setPagination] = React.useState({start: 0, end: rowsPageNum});
    const [pageSelected, setPageSelected] = React.useState(1);
    const [lastPage] = React.useState(parseInt(Math.ceil((remesasList.length / rowsPageNum))));

    let numRows = remesasList.length;
    const limit = remesasList.length;

    const arregloClonado = [...remesasList.slice(pagination.start, pagination.end)];

    const CreateTalble = () => {
      return (
            <>
                <div className="col s12 table-div">
                    <table className='responsive-table'>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Compañia</th>
                            <th>Monto</th>
                            <th>Estatus</th>
                            <th>Creacion</th>
                            <th>Cobranza</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            arregloClonado.map((item) => (
                                <RowTable key={item.id} {...item} />
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    const CreatePag = () => {
        const paginas = [];
        let page = 1;
        const limits = [0, rowsPageNum];

        while (numRows <= limit && numRows > 0){
            paginas.push({
                pagina: page,
                start: limits[0],
                end: limits[1],
            });
            page++;
            numRows -= rowsPageNum;
            limits[0] += rowsPageNum;
            limits[1] = getNextEndLimit(limits[1]);
        }

        return (
            <>
                <div className="col-s12 center-align">
                    <ul className="pagination">
                    <li className={pageSelected === 1 ? 'disabled' : 'waves-effect'}><a onClick={pageSelected === 1 ? () => {} : prev} href="#!"><i className="material-icons">chevron_left</i></a></li>
                    {
                        paginas.map((page) => (
                            <ListPages key={page.pagina} {...page}/>
                        ))
                    }
                    <li className={pageSelected === lastPage ? 'disabled' : 'waves-effect' }><a href="#!" onClick={pageSelected === lastPage ? () => {} : next}><i className="material-icons">chevron_right</i></a></li>
                    </ul>
                </div>
            </>
        );
    }

    const RowTable = ({id, company, amount, status, created_at, charged_at}) => {
        return (<>
            <tr>
                <td>{id}</td>
                <td>{company}</td>
                <td>{amount}</td>
                <td>{status}</td>
                <td>{created_at}</td>
                <td>{charged_at}</td>
            </tr>
        </>)
    }

    const ListPages = ({pagina, start, end}) => {
        return (
            <>
                <li className={pagina === pageSelected ? 'active' : '' } onClick={() => {changePag(pagina, start, end)}}><a href="#!">{pagina}</a></li>
            </>
        )
    }

    const changePag = (pagina, start, end) => {
        setPageSelected(pagina);
        setPagination({start, end})
    }

    const next = () => {
        setPageSelected((pageSelected + 1));
        const start = pagination.start + rowsPageNum;
        const end = getNextEndLimit(pagination.end);
        setPagination({start, end})
    }

    const prev = () => {
        let end;
        if ((pagination.start + rowsPageNum) > pagination.end){
            end = pagination.end - (pagination.end - pagination.start);
        } else {
            end = pagination.end - rowsPageNum;

        }
        const start = pagination.start - rowsPageNum;
        setPageSelected((pageSelected - 1));
        setPagination({start, end})
    }

    const getNextEndLimit = (end) => {
        return (end + rowsPageNum) > limit ? limit : (end + rowsPageNum);
    }

    return (
        <>
            <div className="row">
                <CreateTalble/>
                <CreatePag/>
            </div>
        </>
    )

}