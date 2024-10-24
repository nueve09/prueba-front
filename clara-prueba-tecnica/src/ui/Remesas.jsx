import { Box } from "@mui/material"
import { RemesasList, SearchBtn } from "../components"
import { setHourNow } from "../helpers"
import { useRemesas } from "../hooks/useRemesas"

export const Remesas = () => {

    const { filerRemesas , 
            setPage, 
            totalPages, 
            page,
            isFilter,
            setfilerRemesas,
            search,
            setSearch,
            setIsFilter,
            dropFilter,
            error
        }= useRemesas()
  return (
    <>
    
        <h1
            className="text-4xl font-bold  text-indigo-500 sm:mt-8 xs:mt-4"
        >
            Hoy
        </h1>
        <p className=" text-gray-500 mt-2">
            {setHourNow()}
        </p>

        {/* <!-- Sección de busqueda  --> */}
        <SearchBtn 
            setfilerRemesas={setfilerRemesas}
            search={search}
            setSearch={setSearch}
            dropFilter={dropFilter}
            isFilter={isFilter}
            setIsFilter={setIsFilter}
        />


        {/* <!-- Sección de remesas  --> */}
        <Box
            className="container mt-4"
        >
            <RemesasList
                filerRemesas={filerRemesas}
                setPage={setPage}
                totalPages={totalPages}
                page={page}
                error={error}
             />

        </Box>

    </>
  )
}
