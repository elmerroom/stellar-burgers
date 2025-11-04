import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { getIngredientsApi } from '../../utils/burger-api';
import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  TOrdersData,
  TUser,
  TTabMode
} from '../../utils/types';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
// import { createSelector } from '@reduxjs/toolkit';

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
        // console.log('getIngredients PENDING');
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        // console.log('getIngredients REJECTED', action.error);
        console.log('REJECTED with payload:', action.error.message);
        state.isIngredientsLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        // console.log('getIngredients FULFILLED', action.payload);
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
        // console.log('Ingredients loaded:', action.payload);
        // console.log(state.ingredients);
      });
  }
});

// export const { clearData } = dataSlice.actions;
export default ingredientsSlice.reducer;
export const {
  getIngredientsSelector,
  getBunsSelector,
  getMainsSelector,
  getSaucesSelector,
  getIngredientsLoadingSelector,
  getIngredientsErrorSelector
} = ingredientsSlice.selectors;
