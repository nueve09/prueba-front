// Bibliotecas
import { createSlice } from '@reduxjs/toolkit';
// Data
import RemesasJSON from '@data/remesas.json';


// Estado inicial con informacion de archivo JSON
const initialState = {
  remesas: RemesasJSON.data,
};

// Estado global de remesas
export const remesas = createSlice({
  name: "remesas",
  initialState,
  reducers: {
    setRemesas: (state, action) => {
      state.remesas = action.payload;
    },
    cobrarRemesa: (state, action) => {
      const remesaId = action.payload;
      const remesa = state.remesas.find(remesa => remesa.id === remesaId);
      if (remesa) {
        remesa.status = "COBRADO";
        remesa.charged_at = new Date().toISOString().split('T')[0].replace(/-/g, '');
      }
    },
  },
});

export const { setRemesas, cobrarRemesa } = remesas.actions;
export default remesas.reducer;
