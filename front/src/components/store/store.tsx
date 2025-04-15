// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './events/slices';
import profileReducer from './profile/slices';
import { TypedUseSelectorHook, useSelector as rawUseSelector, useDispatch } from 'react-redux'; 
import authReducer from './auth.slice';
const store = configureStore({
  reducer: {
    events: eventsReducer,
    profile: profileReducer,
    auth: authReducer,
  },
});

// Определяем типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Создаем типизированный хук useAppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelectorMy: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;