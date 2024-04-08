import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { createLogger } from 'redux-logger';
import { meetingApi } from './apis/meetings.api';
import { commentsApi } from './apis/comments.api';
import { usersApi } from './apis/users.api';
import filtersReducer from './slices/filters.slice';
import layoutReducer from './slices/layout.slice';
import { errorLoggerMiddleware } from './middlewares/error.logger.middleware';

const logger = createLogger();

const middlewares = [
  errorLoggerMiddleware,
  meetingApi.middleware,
  commentsApi.middleware,
  usersApi.middleware,
  logger,
];

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    layout: layoutReducer,
    [meetingApi.reducerPath]: meetingApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;