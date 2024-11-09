// src/features/enfants/enfantsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enfantsData: [],
  lastFetchTime: 0,
};

export const enfantsSlice = createSlice({
  name: 'enfants',
  initialState,
  reducers: {
    setEnfants(state, action) {
      state.enfantsData = action.payload;
      state.lastFetchTime = Date.now();
    }

  },
});

export const { setEnfants } = enfantsSlice.actions;
export default enfantsSlice.reducer;
