import { describe, expect, test } from '@jest/globals';

import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  getConstructorSelector
} from '../src/services/features/constructorSlice';
import type { TIngredient } from '../src/utils/types';

describe('constructorSlice', () => {
  let counter = 0;

  beforeEach(() => {
    counter = 0;

    Object.defineProperty(global, 'crypto', {
      value: {
        randomUUID: () => `mock-uuid-${++counter}`
      },
      writable: true,
      configurable: true
    });
  });

  afterEach(() => {
    // @ts-ignore
    delete global.crypto;
  });

  const bun: TIngredient = {
    _id: 'bun-001',
    name: 'Краторная булка N-267',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const sauce: TIngredient = {
    _id: 'sauce-001',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 5,
    calories: 30,
    price: 15,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const main: TIngredient = {
    _id: 'main-001',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const initialState = {
    bun: null,
    ingredients: []
  };

  test('Добавляет булку', () => {
    const action = addIngredient(bun);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toEqual(bun);
    expect(state.bun).not.toHaveProperty('id');
    expect(state.ingredients).toEqual([]);
  });

  test('Добавляет начинку с уникальным id', () => {
    const action = addIngredient(sauce);
    const state = constructorReducer(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...sauce,
      id: expect.any(String)
    });
  });

  test('Добавление нескольких начинок', () => {
    let state = constructorReducer(initialState, addIngredient(sauce));
    state = constructorReducer(state, addIngredient(main));

    expect(state.ingredients).toHaveLength(2);
    expect(state.ingredients[0].type).toBe('sauce');
    expect(state.ingredients[1].type).toBe('main');
  });

  test('removeIngredient — удаляет по индексу', () => {
    const stateWithItems = {
      bun: null,
      ingredients: [
        { ...sauce, id: '1' },
        { ...main, id: '2' },
        { ...sauce, id: '3' }
      ]
    };

    const newState = constructorReducer(stateWithItems, removeIngredient(1));

    expect(newState.ingredients).toHaveLength(2);
    expect(newState.ingredients[0].id).toBe('1');
    expect(newState.ingredients[1].id).toBe('3');
  });

  test('moveIngredient — перемещает ингредиенты', () => {
    const stateWithItems = {
      bun: null,
      ingredients: [
        { ...sauce, id: 'a' },
        { ...main, id: 'b' },
        { ...sauce, id: 'c' }
      ]
    };

    const newState = constructorReducer(
      stateWithItems,
      moveIngredient({ from: 1, to: 0 })
    );

    expect(newState.ingredients[0].id).toBe('b');
    expect(newState.ingredients[1].id).toBe('a');
    expect(newState.ingredients[2].id).toBe('c');
  });

  test('moveIngredient — перемещение вниз', () => {
    const stateWithItems = {
      bun: null,
      ingredients: [
        { ...sauce, id: 'a' },
        { ...main, id: 'b' },
        { ...sauce, id: 'c' }
      ]
    };

    const newState = constructorReducer(
      stateWithItems,
      moveIngredient({ from: 0, to: 2 })
    );

    expect(newState.ingredients[0].id).toBe('b');
    expect(newState.ingredients[1].id).toBe('c');
    expect(newState.ingredients[2].id).toBe('a');
  });

  test('clearConstructor —  очищает конструктор', () => {
    const filledState = {
      bun: bun,
      ingredients: [
        { ...sauce, id: '1' },
        { ...main, id: '2' }
      ]
    };

    const state = constructorReducer(filledState, clearConstructor());

    expect(state).toEqual(initialState);
  });
});
