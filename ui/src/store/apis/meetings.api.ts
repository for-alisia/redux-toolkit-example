import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Meeting, MeetingDTO } from '../../models/Meeting.model';
import formatter from '../../services/Formatter';

export const meetingApi = createApi({
  reducerPath: 'meetingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getAllMeetings: builder.query<Meeting[], void>({
      query: () => '/meetings',
      transformResponse: (response: MeetingDTO[]) => (response.map(({ date, ...meeting }) => ({ ...meeting, ...formatter.parseDate(date)}))),
    })
  })
});

export const { useGetAllMeetingsQuery } = meetingApi;
