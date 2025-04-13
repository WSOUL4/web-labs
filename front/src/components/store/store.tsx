// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices';
import { TypedUseSelectorHook, useSelector as rawUseSelector, useDispatch } from 'react-redux'; 

const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

// Определяем типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Создаем типизированный хук useAppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelectorMy: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;