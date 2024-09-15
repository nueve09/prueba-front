import moment from "moment/moment.js";
import React from "react";

// eslint-disable-next-line react/prop-types
export function HeaderRemesas({data, setRemesasList}) {

    const [isSearching, setIsSearching] = React.useState(false);
    const [searchingValueString, setSearchingValueString] = React.useState('');

    const showSearchingInput = () => {
        setIsSearching(!isSearching);
        setSearchingValueString('');
    }

    const searchValue = (event) => {
        setSearchingValueString(event.target.value);
        if (event.target.value.trim() !== "") {
            // eslint-disable-next-line react/prop-types
            const resultado = data.filter(remesas =>
                remesas.id.toLowerCase().includes(event.target.value.toLowerCase()) ||
                remesas.company.toLowerCase().includes(event.target.value.toLowerCase()) ||
                remesas.amount.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setRemesasList(resultado);
        } else {
            setRemesasList(data);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col s5 right-align">
                    <a className="btn-floating btn-large  waves-effect waves-light  grey-light"><i
                        className="material-icons black-text">notifications_none</i></a>
                </div>
                <div className="col s2">
                    <img className="profile-img"
                         src="https://media.istockphoto.com/id/1434212178/es/foto/dama-del-medio-oriente-usando-computadora-port%C3%A1til-trabajando-en-l%C3%ADnea-sentada-en-la-oficina.jpg?s=612x612&w=0&k=20&c=pk_ReecOSHurTxKZHde9WkKbboga-8OyxJwzByyOHSY="
                         alt="profile_picture"/>
                </div>
                <div className="col s5">
                    <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>
                        <div className="col s8 left-align">
                            <div className="col s12">
                                <span className=""><b>Elizabeth</b></span>
                            </div>
                            <div className="col s12 footer">
                                <span className="">Operator</span>
                            </div>
                        </div>
                        <div className="col s4">
                                    <span>
                                        <i className="material-icons right">arrow_drop_down</i>
                                    </span>
                        </div>
                    </a>
                    <ul id='dropdown1' className='dropdown-content'>
                        <li><a href="#">one</a></li>
                        <li><a href="#">two</a></li>
                        <li className="divider" tabIndex="-1"></li>
                        <li><a href="#">three</a></li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <b className="date-text">Hoy</b>
                    <br/>
                    <b>{moment().format('D MMMM [de] YYYY')}</b>
                </div>
                <div className="col s6 right-align">
                    <a className="btn-floating btn-large waves-effect waves-light primary"><i
                        className="material-icons">keyboard</i></a>
                </div>
            </div>
            <div className="row">
                <div className="col s12 right-align list-buttons-group">
                    <div className="col s12 right-align">
                        <a className={`waves-effect waves-purple btn ${isSearching ? 'blue black-text' : ''}`} onClick={showSearchingInput}><i className="material-icons">search</i></a>&nbsp;
                        <a className="waves-effect waves-purple btn"><i className="material-icons">filter_list</i></a>&nbsp;
                        <a className="waves-effect waves-purple btn"><i className="material-icons">local_printshop</i></a>
                    </div>
                    <div className="input-field col s12 right-align" hidden={!isSearching} >
                        <input placeholder="Buscar..." value={searchingValueString} onChange={searchValue} type="text" className="validate"/>
                    </div>
                </div>
            </div>
        </>
    )

}