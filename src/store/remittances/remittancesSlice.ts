import { Remittance } from '@/interfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface RemittancesState {
    isLoading: boolean
    remittances: Remittance[]
    filterTerm: string
    filteredRemittances: Remittance[]
}

const initialState: RemittancesState = {
    isLoading: false,
    remittances: [],
    filterTerm: '',
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
        filterRemittances: (state, { payload }: PayloadAction<string>) => {
            state.filterTerm = payload

            const term = payload.trim().toLocaleLowerCase()

            if (term === '') {
                state.filteredRemittances = state.remittances

                return
            }

            state.filteredRemittances = state.remittances.filter(x =>
                x.id.includes(term) ||
                x.company.trim().toLocaleLowerCase().includes(term) ||
                String(x.amount).includes(term)
            )
        },
    },
})

export const {
    setIsLoading,
    setRemittances,
    filterRemittances,
} = remittancesSlice.actions