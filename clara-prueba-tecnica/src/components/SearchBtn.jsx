import { Box, Button, Dialog, DialogContent, DialogTitle, InputLabel, TextField } from "@mui/material"
import { useState } from "react"
import { InputsDialog } from "./InputsDialog"

export const SearchBtn = ({setfilerRemesas, search, setSearch,dropFilter, isFilter, setIsFilter}) => {

    const [openModal, setopenModal] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault();

        if(search.id === '' && search.company === '' && search.amount === '') return;

        setfilerRemesas(search)
        setopenModal(!openModal)
    };

  return (
    <div
        className="search-container mt-4"
    >
        <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-md ml-2"
            aria-hidden="true"
            onClick={() => setopenModal(!openModal)}
        >
            
            <i className="fas fa-search"></i>
        </button>
        {isFilter && <Button
            onClick={dropFilter} 
            className="bg-red-500 text-white p-2 rounded-md ml-2"
        >
            <i className="fa-solid fa-filter-circle-xmark p-2"></i>
        </Button>}


        <Dialog 
            open={openModal} 
            onClose={() => setopenModal(!openModal)} 
            fullWidth

            >
                <DialogTitle className="bg-indigo-500 text-white ">
                    Buscar
                    <i className="fas fa-search mx-5"></i>
                </DialogTitle>
                <DialogContent>
                    <Box 
                        component='form'
                        onSubmit={handleSearch}>

                        <Box className="my-2">
                            <InputsDialog 
                                id="search_name" 
                                type="company" 
                                msg="Buscar por compañía"
                                setSearch={setSearch} />        
                        </Box>
                        <Box className="my-2">
                            <InputsDialog 
                                id="serach_id"
                                type="id"
                                msg="Buscar por ID"
                                setSearch={setSearch}
                            />
                        </Box>
                        <Box className="my-2">
                            <InputsDialog 
                                id="serach_amount"
                                type="amount"
                                msg="Buscar por monto"
                                setSearch={setSearch}
                            />
                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        onClick={handleSearch}
                    >
                        Buscar
                    </Button>

                    <Button
                        onClick={dropFilter}
                    >
                        Limpiar
                    </Button>
                </DialogContent>

            
        </Dialog>
    </div>
  )
}
