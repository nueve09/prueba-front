import {useEffect} from "react";
import {HeaderRemesas} from "./HeaderRemesas.jsx";
import {RemesasTable} from "./RemesasTable.jsx";

// eslint-disable-next-line react/prop-types
export function RemesasList({data, remesasList, setRemesasList}) {
    useEffect(() => {
        const elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);
    }, []);


    return (
        <>
            <div className='remesas-list'>
                <div className="container">
                    <HeaderRemesas data={data} remesasList={remesasList} setRemesasList={setRemesasList}/>
                    <RemesasTable  remesasList={remesasList}/>
                </div>
            </div>
        </>
    );

}
