import { configureStore } from '@reduxjs/toolkit';
import focusSlice from './focusSlice';
import GDCSlice from './GDCSlice';
import spellCastSlice from './spellCastSlice';
import unitReducer from './unitSlice';

export default configureStore({
  reducer: {
    units: unitReducer,
    focus: focusSlice,
    gdc: GDCSlice,
    spellCast: spellCastSlice,
  },
});
