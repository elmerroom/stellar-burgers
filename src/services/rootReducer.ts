import { combineReducers } from '@reduxjs/toolkit';
// import getIngredientsSelector, {
//   ingredientsSlice
// } from './features/ingredientsSlice';
import { BurgerConstructor } from '@components';
import constructorReducer from './features/constructorSlice';
import ingredientsReducer from './features/ingredientsSlice';
import orderReducer from './features/orderSlice';
import authReducer from './features/authSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer
});

export default rootReducer;
