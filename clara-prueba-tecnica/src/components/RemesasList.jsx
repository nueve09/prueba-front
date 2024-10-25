import React, { useState } from 'react'
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { formmatCurrency } from '../helpers';
import { ModalErrorAlert } from './ModalErrorAlert';

export const RemesasList = ({filerRemesas, setPage, totalPages, page, error}) => {

    
  return (
    <>
    {error && <ModalErrorAlert
      msg="No se encontraron resultados"
      title="Error"
    />}
    <TableContainer>
      <Table sx={{minWidth: 650, height:'80vh'}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Company</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    
                </TableRow>
        </TableHead>

        <TableBody>
            {filerRemesas.map((remesa) => (
                <TableRow key={remesa.id}>
                    <TableCell 
                      component="th" 
                      align="center"
                      scope="row">
                        {remesa.id}
                    </TableCell>
                    <TableCell align="center">{remesa.company}</TableCell>
                    <TableCell align="center">{formmatCurrency(remesa.amount)}</TableCell>
                    
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Pagination 
      count={totalPages}  
      page={page}
      onChange={(event, value) =>setPage(value)}
      />

    
    </>
    
  )
}
