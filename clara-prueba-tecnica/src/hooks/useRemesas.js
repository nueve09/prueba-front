import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";


export const useRemesas = () => {


    const {remesas}= useSelector((state) => state.remesas);
    
    const [filerRemesas, setFilterRemesas] = useState(remesas);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState({id: '', company: '', amount: ''});
    const [isFilter, setIsFilter] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState();
   

    useEffect(() => {

        orderRemesas(remesas); 
        
        setTotalPages(Math.ceil(remesas.length / limit));
    }, [page, limit, remesas]);
    

    const paginarRemesas = (order_remesas) => {
        const start = (page - 1) * limit;
        const end = start + limit;


        const remesasFiltered = order_remesas.slice(start, end);
        setFilterRemesas(remesasFiltered);

        
    }

    const orderRemesas = (remesas) => {
        //Ordenar remesas por fecha charged_at
        const orderRemesas = [...remesas];
     
        
        orderRemesas.sort((a, b) => {
            // Primero, compara por el status "completed"
            if (a.status === 'Completed' && b.status !== 'Completed') {
                return -1;
            }
            if (a.status !== 'Completed' && b.status === 'Completed') {
                return 1;
            }

             // Si ambos tienen el mismo status, comparar por fecha
             const dateDifference = DateTime.fromISO(a.charged_at) - DateTime.fromISO(b.charged_at);
             return dateDifference;
        });


        
       paginarRemesas(orderRemesas);
    };

    const setfilerRemesas = ({id, company, amount}) => {


           let remesasFiltered 
           
           remesasFiltered= remesas.filter((remesa) => {
            const idMatch = !id.length ? false: (remesa.id).toString().includes(id);
            const companyMatch = !company.length ? false: remesa.company === company;
            const amountMatch = !amount.length ? false: remesa.amount === amount;
            

            return idMatch || companyMatch || amountMatch;
        });
        
        if(!remesasFiltered.length) return dropFilter(null, true);

        setFilterRemesas(remesasFiltered);
        const calculateTotalPages = Math.ceil(remesasFiltered.length / limit);
        setTotalPages(calculateTotalPages);
        setPage(1);
        setIsFilter(true);
        paginarRemesas(remesasFiltered);
        setSearch({id: '', company: '', amount: ''});
    };

    const dropFilter = (e,error=null) => {
        setError(error);
        orderRemesas(remesas);
        setTotalPages(Math.ceil(remesas.length / limit));
        setIsFilter(false);
        setPage(1);

        if(error)
        setTimeout(() => setError(false), 5000);
    };
    

    return {
        filerRemesas,
        page,
        totalPages,
        search,
        isFilter,
        error,
        paginarRemesas,
        orderRemesas,
        setPage,
        setLimit,
        setfilerRemesas,
        setSearch,
        setIsFilter,
        dropFilter 



    };
};