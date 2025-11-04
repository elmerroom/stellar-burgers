import { configureStore } from '@reduxjs/toolkit';
import Reducer from '../services/rootReducer';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// const rootReducer = Reducer; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: Reducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof Reducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
