import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AlertMsg } from '@/interfaces'
import { DIMENTIONS } from '@/utils/constants'

const { MINISIDENAV_WIDTH, SIDENAV_WIDTH } = DIMENTIONS

interface EssentialsState {
    hiddenSidenav: boolean
    miniSidenav: boolean
    sidenavWidth: string
    alertMsg: AlertMsg | null
}

const initialState: EssentialsState = {
    hiddenSidenav: false,
    miniSidenav: false,
    sidenavWidth: SIDENAV_WIDTH,
    alertMsg: null
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
        setAlertMsg: (state, { payload }: PayloadAction<AlertMsg | null>) => {
            state.alertMsg = payload
        },
    },
})

export const {
    setHiddenSidenav,
    setMiniSidenav,
    setAlertMsg,
} = essentialsSlice.actions

// Este slice representa el estado de los parametros esenciales para la app,
// asi como los reducers que lo pueden manipular y los action creators que permiten inicializarlos