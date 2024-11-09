// src/features/ecoles/ecolesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ecolesData: [],
  lastFetchTime: 0,
};

export const ecolesSlice = createSlice({
  name: 'ecoles',
  initialState,
  reducers: {
    setEcoles(state, action) {
      state.ecolesData = action.payload;
      state.lastFetchTime = Date.now();
    }

  },
});

export const { setEcoles } = ecolesSlice.actions;
export default ecolesSlice.reducer;
