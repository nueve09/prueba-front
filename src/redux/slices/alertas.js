// Bibliotecas
import { createSlice } from '@reduxjs/toolkit';


// Estado inicial con informacion por defecto de las alertas
const initialState = {
  visible: false,
  title: '',
  text: '',
  alertaActual: null,
};

// Estado global de alertas
export const alertas = createSlice({
  name: "alerta",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      const { title, text, alertaActual } = action.payload;
      state.visible = true;
      state.title = title;
      state.text = text;
      state.alertaActual = alertaActual;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.title = '';
      state.text = '';
      state.alertaActual = null;
    },
  },
});

export const { showAlert, hideAlert } = alertas.actions;
export default alertas.reducer;