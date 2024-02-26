import { store } from '@/store'
import { filterRemittances, setIsLoading, setRemittances } from '@/store/remittances'
import { getRemittances } from '@/helpers'

export const startLoadRemittances = () =>
    async (dispatch: typeof store.dispatch) => {
        dispatch(setIsLoading())

        const remittances = await getRemittances()

        dispatch(setRemittances(remittances))
        dispatch(filterRemittances(''))
    }