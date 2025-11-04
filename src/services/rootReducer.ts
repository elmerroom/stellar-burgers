import { combineReducers } from '@reduxjs/toolkit';
// import getIngredientsSelector, {
//   ingredientsSlice
// } from './features/ingredientsSlice';
import { BurgerConstructor } from '@components';
import constructorReducer from './features/constructorSlice';
import ingredientsReducer from './features/ingredientsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer
});

export default rootReducer;
