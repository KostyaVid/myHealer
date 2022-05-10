import { createSlice } from '@reduxjs/toolkit';

export const unitSlice = createSlice({
  name: 'units',
  initialState: {
    units: [
      { id: 0, name: 'Player', maxHealth: 100, currentHealth: 100, coefficientArmor: 1 },
      { id: 1, name: 'Tank', maxHealth: 200, currentHealth: 100, coefficientArmor: 0.6 },
      { id: 2, name: 'MDD', maxHealth: 150, currentHealth: 100, coefficientArmor: 0.8 },
      { id: 3, name: 'RDD', maxHealth: 120, currentHealth: 100, coefficientArmor: 1 },
      { id: 4, name: 'RDDr', maxHealth: 120, currentHealth: 100, coefficientArmor: 1 },
    ],
  },
  reducers: {
    setHeal: (state, action) => {
      //action: {id, heal}
      state.units[action.payload.id].currentHealth += action.payload.heal;
      if (state.units[action.payload.id].currentHealth > state.units[action.payload.id].maxHealth) {
        state.units[action.payload.id].currentHealth = state.units[action.payload.id].maxHealth;
      }
    },

    takeDamage: (state, action) => {
      //action: {id, damage}
      state.units[action.payload.id].currentHealth =
        state.units[action.payload.id].currentHealth -
        action.payload.damage * state.units[action.payload.id].coefficientArmor;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHeal, takeDamage } = unitSlice.actions;

export default unitSlice.reducer;
