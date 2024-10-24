import { addRemesa, isError, isLoading } from "./remesasSlice";


export const setNewRemesa = (remesa) => {

    return (dispatch) => {
        dispatch(isLoading());

        try {
            // Simulate an API request
            setTimeout(() => {
                dispatch(addRemesa(remesa));
            }, 2000);
        } catch (error) {
            dispatch(isError(error));
        }
    };
};