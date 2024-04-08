import {
  isRejectedWithValue, MiddlewareAPI, Middleware,
} from '@reduxjs/toolkit';
import { addNotification } from '../slices/layout.slice';

export const errorMap = {
  getAllMeetings: 'Failed to fetch meetings data',
  bookSeat: 'Failed to book',
  getMeetingById: 'Failed to fetch meeting data',
  getCommentsByMeetingId: 'Failed to fetch comments for meetings',
  postComment: 'Failed to post a comment',
}

export const errorLoggerMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { dispatch } = api;
      // @ts-ignore
      const { meta: { arg: { endpointName } }, payload: { status, data } } = action; // Error messages can use any data from request/response
      const errorMsg: string | undefined = errorMap[endpointName as keyof typeof errorMap];

      dispatch(addNotification({ type: 'error', message: errorMsg || 'Error occured' }));
    }

    return next(action)
}
  
