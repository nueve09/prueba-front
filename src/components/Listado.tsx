import { useState } from "react"
import { ChevronLeft } from 'react-bootstrap-icons';
import { ChevronRight } from 'react-bootstrap-icons';

interface props {
    listado: Array<any>;
}

const Listado = ({listado}: props) => {
    const [inicio, setInicio] = useState<any>(0)
    const [final, setFinal] = useState<any>(5)

    const siguiente = () => {
        if (final < listado.length) {
            setInicio(inicio + 5)
            setFinal(final + 5)
        }
    }

    const anterior = () => {
        if (final > 5) {
            setInicio(inicio - 5)
            setFinal(final - 5)
        }
    }

  return (
    <>
    {
        listado.slice(inicio, final).map((items, index) => (
            <div className="d-flex table" key={index}>
              <div>#{items.id}</div>
              <div>{items.company}</div>
              <div>${items.amount}</div>
            </div>
        ))
    }
    <div className="d-flex justify-content-end">
        <ChevronLeft color={'blue'} className="cursor-pointer" onClick={() => anterior()} />
        <ChevronRight color={'blue'} className="cursor-pointer" onClick={() => siguiente()} />
    </div>
    </>
  )
}
  
export default Listado