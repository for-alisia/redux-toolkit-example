import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { createLogger } from 'redux-logger';
import { meetingApi } from './apis/meetings.api';
import filtersReducer from './slices/filters.slice';

const logger = createLogger();

const middlewares = [meetingApi.middleware, logger];

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [meetingApi.reducerPath]: meetingApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;