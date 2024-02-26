import { Remittance } from '@/interfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface RemittancesState {
    isLoading: boolean
    remittances: Remittance[]
    filterTerm: string
    filterOrder: 'ASC' | 'DESC'
    filteredRemittances: Remittance[]
}

const initialState: RemittancesState = {
    isLoading: false,
    remittances: [],
    filterTerm: '',
    filterOrder: 'DESC',
    filteredRemittances: [],
}

export const remittancesSlice = createSlice({
    name: 'remittances',
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = true
        },
        setRemittances: (state, { payload }: PayloadAction<Remittance[]>) => {
            state.remittances = payload
            state.isLoading = false
        },
        setFilterOrder: (state, { payload }: PayloadAction<'ASC' | 'DESC'>) => {
            state.filterOrder = payload

            state.filteredRemittances = state.filteredRemittances.sort((a, b) =>
                state.filterOrder === 'ASC' ? (a.charged_at! - b.charged_at!) : (b.charged_at! - a.charged_at!)
            )
        },
        filterRemittances: (state, { payload }: PayloadAction<string>) => {
            state.filterTerm = payload

            const term = payload.trim().toLocaleLowerCase()
            const chargedRemittances = state.remittances.filter(x => x.status === 'COBRADO').sort((a, b) =>
                state.filterOrder === 'ASC' ? (a.charged_at! - b.charged_at!) : (b.charged_at! - a.charged_at!)
            )

            if (term === '') {
                state.filteredRemittances = chargedRemittances
                return
            }

            state.filteredRemittances = chargedRemittances.filter(x =>
                x.id.includes(term) ||
                x.company.trim().toLocaleLowerCase().includes(term) ||
                String(x.amount).includes(term)
            )
        },
        chargeRemittance: (state, { payload }: PayloadAction<string>) => {
            state.remittances = state.remittances.map(x => {
                if (x.id !== payload) return x

                return {
                    ...x,
                    status: 'COBRADO',
                    charged_at: new Date().getTime(),
                }
            })

            state.filteredRemittances = state.remittances.filter(x => x.status === 'COBRADO').sort((a, b) =>
                state.filterOrder === 'ASC' ? (a.charged_at! - b.charged_at!) : (b.charged_at! - a.charged_at!)
            )
        },
    },
})

export const {
    setIsLoading,
    setRemittances,
    setFilterOrder,
    filterRemittances,
    chargeRemittance,
} = remittancesSlice.actions

// Este slice representa el estado de las remesas en la aplicacion,
// asi como los reducers que lo pueden manipular y los action creators que permiten inicializarlos