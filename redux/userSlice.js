// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  lastFetchTime: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
      state.lastFetchTime = Date.now();
    },
    setClassesData(state, action) {
      state.classes = action.payload;
      state.lastFetchTime = Date.now();
    },
  },
});

export const { setUser , setClassesData} = userSlice.actions;
export default userSlice.reducer;
