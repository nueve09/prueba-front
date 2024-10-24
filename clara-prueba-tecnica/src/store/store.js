import { configureStore } from '@reduxjs/toolkit'
import { remesasSlice } from './slices'

export const store = configureStore({
  reducer: {
    remesas: remesasSlice.reducer,
  },
  
})