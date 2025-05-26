import { useState } from "react";
import "./home.css";
import Menu from "../components/menu/Menu";
import Calculator from "../components/calculator/Calculator";
import TableInformation from "../components/tableInformation/TableInformation";
import GlobalAlert from '../components/globalAlert/GlobalAlert';
import { data_remittances as initialData } from '../data/data_remittances';


const Home = () => {
    const [remittances, setRemittances] = useState(initialData);
    const [modalAlert, setModalAlert] = useState({ show: false, title: '', message: '', type: 'danger' });

    const showModal = (type, message, title = 'Aviso') => {
        setModalAlert({ show: true, title, message, type });
    };

    const closeModal = () => {
        setModalAlert({ ...modalAlert, show: false });
    };

    return (
        <div className="grid-container">
            <GlobalAlert
                show={modalAlert.show}
                title={modalAlert.title}
                message={modalAlert.message}
                type={modalAlert.type}
                onClose={closeModal}
            />
            <Menu/>
            <Calculator 
                remittances={remittances} 
                setRemittances={setRemittances} 
                showAlert={showModal}/>
            <TableInformation remittances={remittances}/>
        </div>
    );

}

export default Home;