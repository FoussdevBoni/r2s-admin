// src/features/drivers/driversSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  driversData: [],
  lastFetchTime: 0,
};

export const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDrivers(state, action) {
      state.driversData = action.payload;
      state.lastFetchTime = Date.now();
    }

  },
});

export const { setDrivers } = driversSlice.actions;
export default driversSlice.reducer;
