import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Meeting, MeetingDTO } from '../../models/Meeting.model';
import formatter from '../../services/Formatter';
import { ApiMethods } from '../../services/ApiMethods';

export const meetingApi = createApi({
  reducerPath: 'meetingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Meetings'],
  endpoints: (builder) => ({
    getAllMeetings: builder.query<Meeting[], void>({
      query: () => '/meetings',
      // Transform response before storing it
      transformResponse: (response: MeetingDTO[]) => (response.map(({ date, ...meeting }) => ({ ...meeting, ...formatter.parseDate(date) }))),
      // By invalidating these tags later it's possible to force refetching data
      providesTags: (result) => (result ? [
        ...result.map(({ id }) => ({ type: 'Meetings', id } as const)),
        { type: 'Meetings', id: 'LIST' },
      ] : [{ type: 'Meetings', id: 'LIST' }]),
    }),
    // For TS: first one returned type, second one - argument type
    bookSeat: builder.mutation<Meeting, number>({
      // We can pass only one arg to query, for multiple values we need to use object
      query: (id: number) => {
        return {
          url: `/meetings/seats/${id}`,
          method: ApiMethods.PUT,
        }
      },
      transformResponse: (meeting: MeetingDTO) => ({ ...meeting, ...formatter.parseDate(meeting.date) }),
      // Shows that getAllMeetings should be refetched
      invalidatesTags: [{ type: 'Meetings', id: 'LIST' }],
    })
  })
});

export const { useGetAllMeetingsQuery, useBookSeatMutation } = meetingApi;
