// store/profileSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile } from '../../api/profile';

// Определите интерфейс для данных профиля
interface ProfileData {
  name: string;
  email: string;
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
        state.error = action.error.message || 'Что-то пошло не так.';
      });
  },
});

export default profileSlice.reducer;