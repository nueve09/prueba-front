import { configureStore } from '@reduxjs/toolkit'
import { essentialsSlice } from '@/store/essentials'
import { remittancesSlice } from '@/store/remittances'

export const store = configureStore({
    reducer: {
        [essentialsSlice.reducerPath]: essentialsSlice.reducer,
        [remittancesSlice.reducerPath]: remittancesSlice.reducer,
    }
})

export type AppGetState = typeof store.getState
export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<AppGetState>