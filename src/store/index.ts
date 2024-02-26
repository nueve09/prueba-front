import { configureStore } from '@reduxjs/toolkit'
import { essentialsSlice } from '@/store/essentials'
import { remittancesSlice } from '@/store/remittances'

// Definicion de la estructura del estado con redux toolkit
export const store = configureStore({
    reducer: {
        [essentialsSlice.reducerPath]: essentialsSlice.reducer,
        [remittancesSlice.reducerPath]: remittancesSlice.reducer,
    }
})

// Tipos de la store
export type AppGetState = typeof store.getState
export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<AppGetState>