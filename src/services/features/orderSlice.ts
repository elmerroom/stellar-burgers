import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  orderBurgerApi,
  getOrdersApi,
  getFeedsApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { TOrder, TOrdersData } from '../../utils/types';

type TOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
  orders: TOrdersData;
  ordersLoading: boolean;
  ordersError: string | null;
  userOrders: TOrder[];
  modalOrders?: TOrder | null;
};

const initialState: TOrderState = {
  order: null,
  isLoading: false,
  error: null,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  ordersLoading: false,
  ordersError: null,
  userOrders: [],
  modalOrders: null
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

export const getAllOrders = createAsyncThunk('order/all', async () => {
  try {
    const response = await getFeedsApi();
    return response;
  } catch (error: any) {
    return error.message || 'Failed to get orders';
  }
});

export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0]; // ← заказ
  }
);

export const getUserOrders = createAsyncThunk('orders/user', async () => {
  const response = await getOrdersApi();
  return response;
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    },
    clearModalOrder: (state) => {
      state.error = null;
      state.modalOrders = null;
      state.isLoading = false;
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
      })
      .addCase(getAllOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modalOrders = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
  selectors: {
    getOrderSelector: (state): TOrder | null => state.order,
    getOrderRequestSelector: (state): boolean => state.isLoading,
    getOrderErrorSelector: (state): string | null => state.error,
    getAllOrdersSelector: (state): TOrder[] => state.orders.orders,
    getAllOrdersTotalSelector: (state): number => state.orders.total,
    getAllOrdersTotalTodaySelector: (state): number => state.orders.totalToday,
    getModalOrder: (state): TOrder | null => state.modalOrders || null,
    getUserOrdersSekector: (state): TOrder[] => state.userOrders
  }
});

export const { clearOrder, clearModalOrder } = orderSlice.actions;
export const {
  getOrderSelector,
  getOrderRequestSelector,
  getOrderErrorSelector,
  getAllOrdersSelector,
  getAllOrdersTotalSelector,
  getAllOrdersTotalTodaySelector,
  getModalOrder,
  getUserOrdersSekector
} = orderSlice.selectors;

export default orderSlice.reducer;
