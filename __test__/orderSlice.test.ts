import orderReducer, {
  createOrder,
  getAllOrders,
  getOrderByNumber,
  getUserOrders
} from '../src/services/features/orderSlice';
import { TOrder, TOrdersData } from '../src/utils/types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Краторный бургер',
  createdAt: '2025-04-05',
  updatedAt: '2025-04-05',
  number: 12345,
  ingredients: ['1', '2']
};

const mockOrdersData: TOrdersData = {
  orders: [mockOrder],
  total: 100,
  totalToday: 10
};

describe('orderSlice — initialState', () => {
  const initialState = {
    order: null,
    isLoading: false,
    error: null,
    orders: { orders: [], total: 0, totalToday: 0 },
    ordersLoading: false,
    ordersError: null,
    userOrders: [],
    modalOrders: null
  };

  describe('createOrder', () => {
    it('pending → isLoading = true, error = null', () => {
      const state = orderReducer(initialState, {
        type: createOrder.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('fulfilled → сохраняет заказ, isLoading = false', () => {
      const state = orderReducer(initialState, {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      });
      expect(state.order).toEqual(mockOrder);
      expect(state.isLoading).toBe(false);
    });

    it('rejected → сохраняет ошибку, isLoading = false', () => {
      const state = orderReducer(initialState, {
        type: createOrder.rejected.type,
        error: { message: 'Нет булки!' }
      });
      expect(state.error).toBe('Нет булки!');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('getAllOrders', () => {
    it('pending → ordersLoading = true, ordersError = null', () => {
      const state = orderReducer(initialState, {
        type: getAllOrders.pending.type
      });
      expect(state.ordersLoading).toBe(true);
      expect(state.ordersError).toBe(null);
    });

    it('fulfilled → сохраняет ленту заказов, ordersLoading = false', () => {
      const state = orderReducer(initialState, {
        type: getAllOrders.fulfilled.type,
        payload: mockOrdersData
      });
      expect(state.orders).toEqual(mockOrdersData);
      expect(state.ordersLoading).toBe(false);
    });

    it('rejected → ordersError, ordersLoading = false', () => {
      const state = orderReducer(initialState, {
        type: getAllOrders.rejected.type,
        error: { message: 'Сервер упал' }
      });
      expect(state.ordersError).toBe('Сервер упал');
      expect(state.ordersLoading).toBe(false);
    });
  });

  describe('getOrderByNumber', () => {
    it('pending → isLoading = true, error = null', () => {
      const state = orderReducer(initialState, {
        type: getOrderByNumber.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('fulfilled → modalOrders, isLoading = false', () => {
      const state = orderReducer(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: mockOrder
      });
      expect(state.modalOrders).toEqual(mockOrder);
      expect(state.isLoading).toBe(false);
    });

    it('rejected → error, isLoading = false', () => {
      const state = orderReducer(initialState, {
        type: getOrderByNumber.rejected.type,
        error: { message: 'Заказ не найден' }
      });
      expect(state.error).toBe('Заказ не найден');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('getUserOrders', () => {
    it('pending → isLoading = true, error = null', () => {
      const state = orderReducer(initialState, {
        type: getUserOrders.pending.type
      });
      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('fulfilled →  userOrders, isLoading = false', () => {
      const state = orderReducer(initialState, {
        type: getUserOrders.fulfilled.type,
        payload: [mockOrder]
      });
      expect(state.userOrders).toEqual([mockOrder]);
      expect(state.isLoading).toBe(false);
    });

    it('rejected → error, isLoading = false', () => {
      const state = orderReducer(initialState, {
        type: getUserOrders.rejected.type,
        error: { message: 'Токен истёк' }
      });
      expect(state.error).toBe('Токен истёк');
      expect(state.isLoading).toBe(false);
    });
  });
});
