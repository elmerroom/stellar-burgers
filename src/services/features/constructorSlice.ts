import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (
        ingredient: TIngredient
      ): { payload: TConstructorIngredient } => ({
        payload: {
          ...ingredient,
          id: crypto.randomUUID()
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients.splice(index, 1);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const [moved] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, moved);
    }
  },
  selectors: {
    getConstructorSelector: (state): TConstructorState => state,
    getConstructorBun: (state): TIngredient | null => state.bun,
    getConstructorIngredients: (state): TConstructorIngredient[] =>
      state.ingredients
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = constructorSlice.actions;

export const {
  getConstructorSelector,
  getConstructorBun,
  getConstructorIngredients
} = constructorSlice.selectors;

export default constructorSlice.reducer;
