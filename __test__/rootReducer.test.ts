import { describe, expect, test } from '@jest/globals';
import store from '../src/services/store';

describe('rootReducer initialization', () => {
  test('Проверка инициализация состояния корневого редюсера', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
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
      },
      auth: {
        user: null,
        isAuth: false,
        isLoading: false,
        error: null
      }
    });

    expect(initialState).toBeDefined();
  });
});
