// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './events/slices';
import profileReducer from './profile/slices';
import authReducer from './auth.slice';
import storage from 'redux-persist/lib/storage'; // localStorage для веба
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector as rawUseSelector, useDispatch } from 'react-redux';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};


const rootReducer = combineReducers({
  events: eventsReducer,
  profile: profileReducer,
  auth: authReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);

// Типы для RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Типизированные хуки для использования в компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelectorMy: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;