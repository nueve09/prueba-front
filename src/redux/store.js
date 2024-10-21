// Bibliotecas
import { configureStore } from '@reduxjs/toolkit';
import remesasReducer from '@redux/slices/remesas';


// Funcion store
const store = configureStore({
  reducer: {
    remesas: remesasReducer,
  },
});

export default store;
