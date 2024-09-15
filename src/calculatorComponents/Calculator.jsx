import React, { useRef, useEffect  }  from "react";
import {ButtonCalculator} from "./ButtonCalculator.jsx";
import moment from "moment/moment.js";

export function Calculator({data, setData, remesasList, setRemesasList}) {
    const array = Array.from({ length: 9 }, (_, index) => index + 1);
    const inputRef = useRef(null);

    const [inputCalculatorValue, setInputCalculatorValue] = React.useState('');
    const [isFocusInput, setIsFocusInput] = React.useState(false);
    const [isMounted, setIsMounted] = React.useState(false);

    const modalRef = useRef(null);

    let instance;

    useEffect(() => {
        if (isMounted){
            inputRef.current.focus();
        }
    }, [inputCalculatorValue, isMounted]);

    const HeaderCalculator = () => {
        return (
            <>
                <div className="row">
                    <div className="col s12 white-text">
                        Ventanilla <strong>Digital</strong>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col s12 light-blue-text">
                        <b>Remesas</b>
                    </div>
                </div>
            </>
        )
    };
    const InputCalculator = () => {
        return (
            <>
                <div className="row">
                    <div className="input-field col s8 offset-s2 white-text">
                        <i className={isFocusInput ? 'material-icons prefix active' : 'material-icons prefix'}>last_page</i>
                        <input id="icon_prefix" className='white-text input-field-1' type="text" autoComplete="off" ref={inputRef} value={inputCalculatorValue} onInput={manejarCambio} onKeyDown={manejarCambio} onFocus={() => {setIsMounted(true)}}/>
                        <label htmlFor="icon_prefix" className={isFocusInput ? 'active' : ''}>Calculate</label>
                    </div>
                </div>
            </>
        )
    }

    const manejarCambio = (event) => {
        if (inputCalculatorValue.length >= 8 && event.key !== 'Backspace' && event.key !== 'Enter'){
            M.Toast.dismissAll();
            M.toast({html: 'Solo Se permiten 8 Caracteres', classes: 'red darken-4'})
        } else {
            if (/^[0-9]$/.test(event.key)){
                setInputCalculatorValue(event.target.value);
                setInputCalculatorValue(inputCalculatorValue + event.key);
            } else if (event.key === 'Backspace'){
                if (inputCalculatorValue.length === 0){
                    setIsFocusInput(false)
                } else {
                    deleteInputCalculator();
                }

            } else if (event.key === 'Enter'){
                submitAction();
            }
        }
        event.preventDefault();
    }

    const submitAction = () => {
        M.Toast.dismissAll();
        if (inputCalculatorValue.trim() !== ''){
            const resultado = data.filter(remesas =>
                remesas.id.toLowerCase() === inputCalculatorValue.toLowerCase()
            );

            if (resultado.length){
                if (resultado[0].status === 'COBRADO'){
                    M.toast({html: `El id ${inputCalculatorValue} ya ha sido cobrado en el ${resultado[0].charged_at}`, classes: 'yellow darken-4'})
                } else if (resultado[0].status === 'NO_COBRADO'){
                    instance = M.Modal.init(modalRef.current);
                    instance.open();
                }
            } else {
                M.toast({html: `El id ${inputCalculatorValue} no existe, por favor verifique`, classes: 'red darken-4'})
            }
            inputRef.current.focus();
            setRemesasList(resultado);
        } else {
            M.toast({html: `Se necesita poner un ID valido`, classes: 'red', stack: false})
        }
    }

    const cobrarRemesa = () => {
        M.Toast.dismissAll();
        const currentValue = data.map(obj => {
            if (obj.id === inputCalculatorValue) {
                obj.status = "COBRADO";
                obj.charged_at = moment().format('YYYYMD');
            }
            return obj;
        })
        instance = M.Modal.init(modalRef.current);
        instance.close();

        setData(currentValue);
        setRemesasList(currentValue);
        setInputCalculatorValue("");

        M.toast({html: `La remesa ${inputCalculatorValue} cobrada correctamente. `, classes: 'green'})
    }

    const buttonAddEvent = (value) => {
        if (inputCalculatorValue.length >= 8){
            M.Toast.dismissAll();
            M.toast({html: 'Solo Se permiten 8 Caracteres', classes: 'red darken-4'})
        } else {
            setInputCalculatorValue(inputCalculatorValue + value);
            setIsFocusInput(true);
        }
    }

    const deleteInputCalculator = () => {
        setInputCalculatorValue(inputCalculatorValue.substring(0, inputCalculatorValue.length - 1));
        inputCalculatorValue.length === 0 ? setIsFocusInput(false) : '';
        setRemesasList(data);
    }


    return (
        <>
            <div className='calculator'>
                <div className="modal modal-fixed-footer" ref={modalRef}>
                    <div className="modal-content">
                        <h4>Cobrar Remesa</h4>
                        <p>¿Esta seguro que desea cobrar esta remesa?</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" onClick={cobrarRemesa} className="waves-effect green waves-purple black-text btn-flat white-text">Cobrar</a>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                    </div>
                </div>
                <div className="container">
                    <HeaderCalculator/>
                    <InputCalculator/>
                    <div className="row">
                        <div className="col s8 offset-s2">
                            <div className="col s8">
                                {
                                    array.map((number, index) => (
                                        <ButtonCalculator key={index} numerCalculator={number} action={() => {
                                            buttonAddEvent(number)
                                        }}/>
                                    ))
                                }
                                <div className="col s12">
                                    <ButtonCalculator key='0' numerCalculator='0' typeButton='HORIZONTAL_LARGE'
                                                      action={() => {
                                                          buttonAddEvent(0)
                                                      }}/>
                                    <ButtonCalculator key='point' numerCalculator='.' actionN={() => {
                                        buttonAddEvent('.')
                                    }}/>
                                </div>
                            </div>
                            <div className="col s4">
                                <ButtonCalculator key='back' action={deleteInputCalculator}
                                                  iconButton={<i className="material-icons">backspace</i>}
                                                  typeButton='VERTICAL_LARGE'/>
                                <br/>
                                <ButtonCalculator key='enter' action={submitAction}
                                                  iconButton={<i className="material-icons">keyboard_return</i>}
                                                  typeButton='VERTICAL_LARGE_PRIMARY'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}