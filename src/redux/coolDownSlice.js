import { createSlice } from '@reduxjs/toolkit';

export const coolDownSlice = createSlice({
  name: 'coolDown',
  initialState: {
    nameSpellCoolDown: false,
  },
  reducers: {
    setCoolDown: (state, action) => {
      state[action.payload.nameSpell] = true;
    },
    endCoolDown: (state, action) => {
      state[action.payload.nameSpell] = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCoolDown, endCoolDown } = coolDownSlice.actions;

export default coolDownSlice.reducer;
