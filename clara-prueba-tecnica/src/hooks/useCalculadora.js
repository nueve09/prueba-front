import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findRemesaAndChangeStatus } from "../store/slices/remesas/remesasSlice"

export const useCalculadora = () => {

    const [id, setId] = useState('********')
    const [cleanId, setCleanId] = useState('')
    const {remesas} = useSelector((state) => state.remesas)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState('')
    const dispatch = useDispatch()


    const formmatId = (number) => {
        //buscando que sea un dato numerico
        const value = parseInt(number)
        if(isNaN(value)) return;
        //buscando que sea un dato positivo
        if(value < 0) return;

        const newId = id.replace(/^\*+/, '');

        if(newId.length >= 8) return;

        const newIdFormat = newId + value;
        
        if(newIdFormat.length > 8) return;

        //relleando con asteriscos hasta completar 8 caracteres
        const numberAsterisc = 8 - newIdFormat.length;
        const asterisc = '*'.repeat(numberAsterisc)
        setId(asterisc + newIdFormat)
        setCleanId(newIdFormat)

    }

   const deleteOneDigit = () => {
        const newId = id.replace(/^\*+/, '');
        const newIdFormat = newId.slice(0, -1);
        const numberAsterisc = 8 - newIdFormat.length;
        const asterisc = '*'.repeat(numberAsterisc)

        setId(asterisc + newIdFormat)
    }

    const setInitialValue = () => {
        setId('********')
    }

    const findRemesas = () => {
      const status= 'Completed'
      const remesa = remesas.find((remesa) => remesa.id === cleanId)
      if(!remesa) {
        setError(true)
        setMsg('Remesa no encontrada')
        return
      }

        setError(false)
        setMsg('Remesa encontrada')
      dispatch(findRemesaAndChangeStatus({id: cleanId, status}))


    }
       
        

  return {
    id,
    setId,
    formmatId,
    deleteOneDigit,
    setInitialValue,
    findRemesas,
    error, setError,
    msg, setMsg
  }
}
