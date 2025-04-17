// store/profileSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile,changeData } from '../../../api/profile';
import {  findMy } from '../../../api/eventService';
import { refresh } from '../../../api/authService';
import { useNavigate } from 'react-router-dom';
//const navigate = useNavigate();
//profile
// Определите интерфейс для данных профиля
export interface ProfileData {
  name: string;
  surname: string;
  fname: string;
  gender: string;
  birthday: string;
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


export const changeProfile = createAsyncThunk<ProfileData, Partial<ProfileData>>(
  'profile/changeProfile',
  async (updatedProfile) => {
    //console.log(updatedProfile);
    const response = await changeData(updatedProfile);
    return response;
  }
);
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setDataProfile(state, action) {
      state.data = action.payload;
    },
  },
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
      })



      .addCase(changeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Сохраняем данные профиля
      })
      .addCase(changeProfile.rejected, (state, action) => {
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



export const { setDataProfile } = profileSlice.actions;

export default profileSlice.reducer;