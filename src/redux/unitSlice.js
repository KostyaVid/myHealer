import { createSlice } from '@reduxjs/toolkit';

export const unitSlice = createSlice({
  name: 'units',
  initialState: {
    units: [
      {
        id: 0,
        name: 'Player',
        maxHealth: 1000,
        currentHealth: 1000,
        coefficientArmor: 1,
        isLife: true,
      },
      {
        id: 1,
        name: 'Tank',
        maxHealth: 2000,
        currentHealth: 2000,
        coefficientArmor: 0.6,
        isLife: true,
      },
      {
        id: 2,
        name: 'MDD',
        maxHealth: 1500,
        currentHealth: 1500,
        coefficientArmor: 0.8,
        isLife: true,
      },
      {
        id: 3,
        name: 'RDD',
        maxHealth: 1200,
        currentHealth: 1200,
        coefficientArmor: 1,
        isLife: true,
      },
      {
        id: 4,
        name: 'RDDr',
        maxHealth: 1200,
        currentHealth: 1200,
        coefficientArmor: 1,
        isLife: true,
      },
    ],
  },
  reducers: {
    setHeal: (state, action) => {
      //action: {id, heal}
      if (state.units[action.payload.id].isLife) {
        state.units[action.payload.id].currentHealth += action.payload.heal;
        Math.trunc(state.units[action.payload.id].currentHealth);
        if (
          state.units[action.payload.id].currentHealth > state.units[action.payload.id].maxHealth
        ) {
          state.units[action.payload.id].currentHealth = state.units[action.payload.id].maxHealth;
        }
      }
    },

    takeDamage: (state, action) => {
      //action: {id, damage}
      if (state.units[action.payload.id].isLife) {
        state.units[action.payload.id].currentHealth =
          state.units[action.payload.id].currentHealth -
          action.payload.damage * state.units[action.payload.id].coefficientArmor;
        if (state.units[action.payload.id].currentHealth <= 0) {
          state.units[action.payload.id].currentHealth = 0;
          state.units[action.payload.id].isLife = false;
        }
      }
    },

    takeDamageAll: (state, action) => {
      //action: {damage}
      state.units.forEach((element) => {
        if (element.isLife) {
          element.currentHealth =
            element.currentHealth - action.payload.damage * element.coefficientArmor;
          if (element.currentHealth <= 0) {
            element.currentHealth = 0;
            element.isLife = false;
          }
        }
      });
    },

    die: (state, action) => {
      //action: {id, damage}
      state.units[action.payload.id].isLife = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHeal, takeDamage, takeDamageAll, die } = unitSlice.actions;

export default unitSlice.reducer;
