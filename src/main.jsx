import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {App} from "./App.jsx";
import './index.css';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css';
import moment from 'moment';
import 'moment/locale/es';


M.AutoInit();
moment.locale('es');

createRoot(document.getElementById('root')).render(
    <>
        <App/>
    </>
)
