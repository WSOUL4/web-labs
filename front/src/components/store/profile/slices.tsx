// store/profileSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile } from '../../../api/profile';
import {  findMy } from '../../../api/eventService';
import { refresh } from '../../../api/authService';
import { useNavigate } from 'react-router-dom';
//const navigate = useNavigate();
//profile
// Определите интерфейс для данных профиля
interface ProfileData {
  name: string;
  email: string;
  id: number;
}

interface ProfileState {
  data: ProfileData | null; // Теперь это будет либо объект с данными профиля, либо null
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};



// Асинхронный thunk для получения профиля
export const fetchProfile = createAsyncThunk<ProfileData>('profile/fetchProfile', async () => {
  const response = await getProfile();
  return response; // Возвращаем данные профиля
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Сохраняем данные профиля
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        //state.error = action.error.message || 'Что-то пошло не так.';
        if (action.error.message?.includes('401')) {
          state.error =('Ошибка 401: Вы не авторизованы, или ваш токен доступа прослочился.\nТокен сделал обновление, попробуйте ещё 1 раз.');
          refresh();
          //navigate('/');

        } else if (action.error.message?.includes('403')){
          state.error =('Ошибка 403: Вы не авторизованы, или ваш токен доступа прослочился.\nТокен сделал обновление, попробуйте ещё 1 раз.');
          refresh();
          //navigate('/');
        }
      });
  },
});




export default profileSlice.reducer;