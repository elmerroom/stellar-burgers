import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientsId: string[]) => {
    try {
      const response = await orderBurgerApi(ingredientsId);
      return response.order;
    } catch (error: any) {
      return error.message || 'Failed to create order';
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
  selectors: {
    getOrderSelector: (state): TOrder | null => state.order,
    getOrderRequestSelector: (state): boolean => state.isLoading,
    getOrderErrorSelector: (state): string | null => state.error
  }
});

export const { clearOrder } = orderSlice.actions;
export const {
  getOrderSelector,
  getOrderRequestSelector,
  getOrderErrorSelector
} = orderSlice.selectors;

export default orderSlice.reducer;
