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
    
   
  },
})

// Action creators are generated for each case reducer function
export const { isLoading, addRemesa, isError} = remesasSlice.actions
