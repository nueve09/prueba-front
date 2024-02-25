import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ErrorAlert } from '@/interfaces'
import { DIMENTIONS } from '@/utils/constants'

const { MINISIDENAV_WIDTH, SIDENAV_WIDTH } = DIMENTIONS

interface EssentialsState {
    hiddenSidenav: boolean
    miniSidenav: boolean
    sidenavWidth: string
    errors: ErrorAlert[]
}

const initialState: EssentialsState = {
    hiddenSidenav: false,
    miniSidenav: false,
    sidenavWidth: SIDENAV_WIDTH,
    errors: [],
}

export const essentialsSlice = createSlice({
    name: 'essentials',
    initialState,
    reducers: {
        setHiddenSidenav: (state, { payload }: PayloadAction<boolean>) => {
            state.hiddenSidenav = payload
        },
        setMiniSidenav: (state, { payload }: PayloadAction<boolean>) => {
            state.miniSidenav = payload
            state.sidenavWidth = payload ? MINISIDENAV_WIDTH : SIDENAV_WIDTH
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
    setHiddenSidenav,
    setMiniSidenav,
    addError,
    deleteError,
} = essentialsSlice.actions