// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './events/slices';
import profileReducer from './profile/slices';
import authReducer from './auth.slice';
import storage from 'redux-persist/lib/storage'; // localStorage для веба
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector as rawUseSelector, useDispatch } from 'react-redux';

// Конфигурация redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // сохраняем только auth
};

// Комбинируем все редьюсеры
const rootReducer = combineReducers({
  events: eventsReducer,
  profile: profileReducer,
  auth: authReducer,
});

// Оборачиваем rootReducer в persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store с persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Создаем persistor для управления процессом персистенции
export const persistor = persistStore(store);

// Типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Типизированные хуки для использования в компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelectorMy: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;