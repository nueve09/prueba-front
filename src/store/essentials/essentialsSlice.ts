import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ErrorAlert } from '@/interfaces'

interface EssentialsState {
    miniSidenav: boolean
    errors: ErrorAlert[]
}

const initialState: EssentialsState = {
    miniSidenav: false,
    errors: [],
}

export const essentialsSlice = createSlice({
    name: 'essentials',
    initialState,
    reducers: {
        setMiniSidenav: (state, { payload }: PayloadAction<boolean>) => {
            state.miniSidenav = payload
        },
        addError: (state, { payload }: PayloadAction<ErrorAlert>) => {
            state.errors.push(payload)
        },
        deleteError: (state, { payload }: PayloadAction<string>) => {
            state.errors = state.errors.filter(x => x.id !== payload)
        },
    },
})

export const {
    setMiniSidenav,
    addError,
    deleteError,
} = essentialsSlice.actions