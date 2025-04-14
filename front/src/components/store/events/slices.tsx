// store/profileSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { refresh } from '../../../api/authService';
import {  findAll, findMy, findBetweenDates, changeEvent } from '../../../api/eventService';




//events
interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  createdBy: number;
}
interface EventsState {
  data: EventData[] | null; // Теперь это будет либо объект с данными профиля, либо null
  loading: boolean;
  error: string | null;
}
interface FetchEventsParams {
  dateStart: string; 
  dateEnd: string;   
}
const initialState: EventsState = {
  data: null,
  loading: false,
  error: null,
};
export const fetchMyEvents = createAsyncThunk<EventData[]>('events/fetchMyEvents', async () => {
  const response = await findMy();
  return response;
});
export const fetchAllEvents = createAsyncThunk<EventData[]>('events/fetchAllEvents', async () => {
  const response = await findAll();
  //console.log(response);
  return response;
});
export const fetchEventsBetweenDates = createAsyncThunk<EventData[], FetchEventsParams>(
  'events/fetchEventsBetweenDates',
  async ({ dateStart, dateEnd }) => {
    const response = await findBetweenDates(dateStart, dateEnd);
    return response;
  }
);

// Добавляем новый редьюсер для обновления событий
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    updateEvents(state, action) {
      // Обновляем состояние с новыми событиями
      
      if (state.data) {
        state.data = state.data.map(event =>
          event.id === action.payload.id ? { ...event, ...action.payload } : event
        );
      }
    },
    clearEvents(state) {
      state.data = [];
      state.error = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMyEvents.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message?.includes('401')) {
          state.error = ('Ошибка 401: Вы не авторизованы, или ваш токен доступа прослочился.\nТокен сделал обновление, попробуйте ещё раз.');
          refresh();
        } else if (action.error.message?.includes('403')) {
          state.error = ('Ошибка 403: Вы не авторизованы, или ваш токен доступа прослочился.\nТокен сделал обновление, попробуйте ещё раз.');
          refresh();
        }
      })




      .addCase(fetchAllEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Что-то пошло не так.';
      })

      .addCase(fetchEventsBetweenDates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventsBetweenDates.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchEventsBetweenDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Что-то пошло не так.';
      });
  },
});

// Экспортируем новый action
export const { updateEvents,clearEvents } = eventsSlice.actions;

export default eventsSlice.reducer;