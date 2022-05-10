import { createSlice } from '@reduxjs/toolkit';

export const iconBuffSlice = createSlice({
  name: 'iconBuff',
  initialState: {
    unit: [{ icons: [] }, { icons: [] }, { icons: [] }, { icons: [] }, { icons: [] }],
  },
  reducers: {
    setBuff: (state, action) => {
      //{id, address}
      state.unit[action.payload.id].icons.push(action.payload.address);
    },
    deleteBuff: (state, action) => {
      //{id, address}
      const indexBuff = state.unit[action.payload.id].icons.indexOf(action.payload.address);
      if (indexBuff !== -1) {
        state.unit[action.payload.id].icons.splice(indexBuff, 1);
      }
    },
  },
});

export const { setBuff, deleteBuff } = iconBuffSlice.actions;

export default iconBuffSlice.reducer;
