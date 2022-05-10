import { createSlice } from '@reduxjs/toolkit';

export const focusSlice = createSlice({
  name: 'focus',
  initialState: {
    focusPlayer: 0,
  },
  reducers: {
    setFocusPlayer: (state, action) => {
      state.focusPlayer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFocusPlayer } = focusSlice.actions;

export default focusSlice.reducer;
