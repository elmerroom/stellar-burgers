import ingredientsReducer, {
  getIngredients
} from '../src/services/features/ingredientsSlice';
import { TIngredient } from '../src/utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: '2',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isIngredientsLoading: false,
    error: null
  };

  test('getIngredients pending — устанавливает isIngredientsLoading = true', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isIngredientsLoading: true,
      error: null
    });
  });

  test('getIngredients fulfilled — сохраняет ингредиенты и сбрасывает loading', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredients: mockIngredients,
      isIngredientsLoading: false
    });
  });

  test('getIngredients rejected — устанавливает error и сбрасывает loading', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Failed to fetch' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isIngredientsLoading: false,
      error: 'Failed to fetch'
    });
  });
});
