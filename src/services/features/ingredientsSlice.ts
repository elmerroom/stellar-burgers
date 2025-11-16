import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk('Ingredients/getALL', async () =>
  getIngredientsApi()
);

type TIngredientsState = {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    getIngredientsLoadingSelector: (state) => state.isIngredientsLoading,
    getIngredientsErrorSelector: (state) => state.error,
    getBunsSelector: createSelector(
      (state: TIngredientsState) => state.ingredients,
      (ingredients) => ingredients.filter((item) => item.type === 'bun')
    ),

    getMainsSelector: createSelector(
      (state: TIngredientsState) => state.ingredients,
      (ingredients) => ingredients.filter((item) => item.type === 'main')
    ),

    getSaucesSelector: createSelector(
      (state: TIngredientsState) => state.ingredients,
      (ingredients) => ingredients.filter((item) => item.type === 'sauce')
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
export const {
  getIngredientsSelector,
  getBunsSelector,
  getMainsSelector,
  getSaucesSelector,
  getIngredientsLoadingSelector,
  getIngredientsErrorSelector
} = ingredientsSlice.selectors;
