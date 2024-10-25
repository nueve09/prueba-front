import { createSlice } from '@reduxjs/toolkit'
import db from '../../../db/db'

export const remesasSlice = createSlice({
  name: 'remesas',
  initialState:{
    remesas: db,
    loading: true,
    error: null,
    pages: 0,
  },
  reducers: {
    isLoading: (state) => {
      
      state.value += 1
    },
    addRemesa: (state, action) => {
        state.remesas.push(action.payload)
    },
    isError: (state, action) => {
      state.error = action.payload
    },
    findRemesaAndChangeStatus: (state, {payload}) => {
     // Buscas la remesa específica en el array `remesas`
    const remesaIndex = state.remesas.findIndex(remesa => remesa.id === payload.id);

    // Si la remesa no existe, no hagas nada
    if (remesaIndex === -1) return;

    // Cambias el estado de la remesa a `Completed`
    state.remesas[remesaIndex].status = payload.status;

      
    },
    
   
  },
})

// Action creators are generated for each case reducer function
export const 
{ 
  isLoading, 
  addRemesa, 
  isError,
  findRemesaAndChangeStatus
} = remesasSlice.actions
