// src/features/flottes/flottesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flottesData: [],
  lastFetchTime: 0,
};

export const flottesSlice = createSlice({
  name: 'flottes',
  initialState,
  reducers: {
    setFlottes(state, action) {
      state.flottesData = action.payload;
      state.lastFetchTime = Date.now();
    }

  },
});

export const { setFlottes } = flottesSlice.actions;
export default flottesSlice.reducer;
