import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { meetingApi } from './apis/meetings.api';

export const store = configureStore({
  reducer: {
    [meetingApi.reducerPath]: meetingApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(meetingApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch