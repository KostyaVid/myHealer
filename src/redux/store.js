import { configureStore } from '@reduxjs/toolkit';
import coolDownSlice from './coolDownSlice';
import focusSlice from './focusSlice';
import GDCSlice from './GDCSlice';
import iconBuffSlice from './iconBuffSlice';
import spellCastSlice from './spellCastSlice';
import unitReducer from './unitSlice';

export default configureStore({
  reducer: {
    units: unitReducer,
    focus: focusSlice,
    gdc: GDCSlice,
    spellCast: spellCastSlice,
    iconBuff: iconBuffSlice,
    coolDown: coolDownSlice,
  },
});
