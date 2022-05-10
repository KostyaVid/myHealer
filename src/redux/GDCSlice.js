import { createSlice } from '@reduxjs/toolkit';

export const GDCSlice = createSlice({
  name: 'gdc',
  initialState: {
    isGDC: false,
  },
  reducers: {
    startGDC: (state) => {
      state.isGDC = true;
    },
    endGDC: (state) => {
      state.isGDC = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startGDC, endGDC } = GDCSlice.actions;

export default GDCSlice.reducer;
