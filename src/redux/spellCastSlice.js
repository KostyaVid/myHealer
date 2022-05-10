import { createSlice } from '@reduxjs/toolkit';

export const spellCastSlice = createSlice({
  name: 'spellCast',
  initialState: {
    castTime: 0,
    isCast: false,
  },
  reducers: {
    setSpellCast: (state, action) => {
      state.isCast = action.payload.isCast;
      state.castTime = action.payload.castTime;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSpellCast } = spellCastSlice.actions;

export default spellCastSlice.reducer;
