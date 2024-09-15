import {SideBar} from "./sideBarComponents/SideBar.jsx";
import {Calculator} from "./calculatorComponents/Calculator.jsx";
import {RemesasList} from "./remesasList/RemesasList.jsx";
import React from "react";

export function App() {

    const sideBarItems = [
        {
            icon: "fa fa-home"
        },
        {
            icon: "fa fa-american-sign-language-interpreting"
        },
        {
            icon: "fa fa-book"
        },
        {
            icon: "fa fa-briefcase"
        },
        {
            icon: "fa fa-reply-all"
        },
        {
            icon: "fa fa-bar-chart"
        }
    ];
    const response = [
        {
            id: "1",
            company: "COMPANY 1",
            amount: "12001",
            status: "COBRADO",
            created_at: "20240910",
            charged_at: "20240911"
        },
        {
            id: "2",
            company: "COMPANY 1",
            amount: "12002",
            status: "COBRADO",
            created_at: "20240910",
            charged_at: "20241004"
        },
        {
            id: "3",
            company: "COMPANY 1",
            amount: "12003",
            status: "COBRADO",
            created_at: "20240910",
            charged_at: "20241003"
        },
        {
            id: "4",
            company: "COMPANY 1",
            amount: "12004",
            status: "COBRADO",
            created_at: "20240910",
            charged_at: "20241002"
        },
        {
            id: "5",
            company: "COMPANY 1",
            amount: "12005",
            status: "COBRADO",
            created_at: "20240910",
            charged_at: "20241001"
        },
        {id: "6", company: "SVG 2", amount: "22006", status: "NO_COBRADO", created_at: "20240911", charged_at: ""},
        {
            id: "7",
            company: "SVG 2",
            amount: "22007",
            status: "NO_COBRADO",
            created_at: "20240911",
            charged_at: ""
        },
        {
            id: "8", company: "SVG 2", amount: "22008", status: "NO_COBRADO", created_at: "20240911", charged_at: ""
        },
        {
            id: "9",
            company: "SVG 2",
            amount: "22009",
            status: "NO_COBRADO",
            created_at: "20240911",
            charged_at: ""
        },
        {
            id: "10",
            company: "SVG 2",
            amount: "22010",
            status: "NO_COBRADO",
            created_at: "20240911",
            charged_at: ""
        },
        {
            id: "11",
            company: "ELE 3",
            amount: "32011",
            status: "NO_COBRADO",
            created_at: "20240912",
            charged_at: ""
        },
        {
            id: "12",
            company: "ELE 3",
            amount: "32012",
            status: "NO_COBRADO",
            created_at: "20240912",
            charged_at: ""
        },
        {
            id: "13",
            company: "ELE 3",
            amount: "32013",
            status: "NO_COBRADO",
            created_at: "20240912",
            charged_at: ""
        },
        {
            id: "14",
            company: "ELE 3",
            amount: "32014",
            status: "NO_COBRADO",
            created_at: "20240912",
            charged_at: ""
        },
        {
            id: "15",
            company: "ELE 3",
            amount: "32015",
            status: "COBRADO",
            created_at: "20240912",
            charged_at: "20241005"
        }
    ];

    const [data, setData] = React.useState(response);
    const [remesasList, setRemesasList] = React.useState(response);

    const orderByCharget = () => {
        data.sort((a, b) => {
            const dateA = new Date(a.charged_at.slice(0, 4), a.charged_at.slice(4, 6) - 1, a.charged_at.slice(6));
            const dateB = new Date(b.charged_at.slice(0, 4), b.charged_at.slice(4, 6) - 1, b.charged_at.slice(6));
            return dateB - dateA;
        });
    }

    orderByCharget();

    return (
        <>
            <div className="wrapper">
                <SideBar sideBarItems={sideBarItems} />
                <Calculator data={data} setData={setData} remesasList={remesasList} setRemesasList={setRemesasList}/>
                <RemesasList data={data} remesasList={remesasList} setRemesasList={setRemesasList}/>
            </div>
        </>
    )

}