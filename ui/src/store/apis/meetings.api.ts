import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import type { Meeting, MeetingDTO, MetingDetailed } from '../../models/Meeting.model';
import formatter from '../../services/Formatter';
import { ApiMethods } from '../../services/ApiMethods';
import { useGetUsersByIdsQuery } from './users.api';

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
      // Shows that getAllMeetings and§ getMeetingById should be refetched
      invalidatesTags: (_, __, id) => [{ type: 'Meetings', id: 'LIST' }, { type: 'Meetings', id }],
    }),
    getMeetingById: builder.query<MetingDetailed, number>({
      query: (id) => `/meetings/${id}`,
      transformResponse: ({ date, ...other }: MetingDetailed) => ({ ...other, ...formatter.parseDate(date)}),
      providesTags: (_, __, id) => [{ type: 'Meetings', id }],
    })
  })
});

export const {
  useGetAllMeetingsQuery,
  useBookSeatMutation,
  useGetMeetingByIdQuery,
} = meetingApi;

export const useMeetingDetails = (meetingId: number | undefined, skip: boolean) => {
  const { data: meeting, isFetching: isFetchingMeeting } = useGetMeetingByIdQuery(meetingId || 0, {
    skip,
  });

  const userIds = meeting?.attendies;
  const { data: users, isFetching: isFetchngUsers } = useGetUsersByIdsQuery(userIds || [], {
    skip: skip || !userIds,
  });

  const enrichedMeeting: MetingDetailed | null = useMemo(() => {
    if (!meeting) {
      return null;
    }

    return {
      ...meeting,
      attendies: userIds?.map((id) => {
        const user = users?.find((user) => user.id === id);

        return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
      }) || [],
    }
  }, [meeting, users, userIds]);

  return {
    isLoading: isFetchingMeeting || isFetchngUsers,
    meeting: enrichedMeeting,
  }
};
