import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment, CommentDTO } from '../../models/Comment.model';
import formatter from '../../services/Formatter';
import { ApiMethods } from '../../services/ApiMethods';
import { User } from '../../models/User.model';

const transformComments = async (comments: CommentDTO[]): Promise<Comment[]> => {
  const enrichedWithDateComments = comments.map(({ createdDate, ...other }) => ({
    ...other,
    date: formatter.parseDate(createdDate).date,
    time: formatter.parseDate(createdDate).time,
  }));

  const uniqueAuthors = new Set(enrichedWithDateComments.map(({ authorId }) => authorId));

  const autorsRawData = await fetch('http://localhost:3001/users/byId', {
    method: ApiMethods.POST,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ids: Array.from(uniqueAuthors) }),
  });

  const authors: User[] = await autorsRawData.json();

  return enrichedWithDateComments.map(({ authorId, ...other }) => {
    const commentAuthor = authors.find(({ id }) => id === authorId);
    return {
      ...other,
      authorName: commentAuthor ? `${commentAuthor.firstName} ${commentAuthor.lastName}` : 'Unknown',
      authorId,
    }
  });
};

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/comments' }),
  tagTypes: ['Comments'], // Tag types are independant - they belong to specific api
  endpoints: (builder) => ({
    getCommentsByMeetingId: builder.query<Comment[], number>({
      query: (id) => `/${id}`,
      transformResponse: async (response: CommentDTO[]) => {
        const enrichedComments = await transformComments(response);

        return enrichedComments;
      },
      providesTags: (_, __, id) => [{ type: 'Comments', id }],
    }),
    postComment: builder.mutation<void, CommentDTO>({
      query: (comment) => ({
        method: ApiMethods.POST,
        url: '', 
        body: comment,
      }),
      // Optimistic update (also can be used to invalidate tage from different api)
      async onQueryStarted(comment, { dispatch, queryFulfilled }) {
        const { text, authorId, createdDate, meetingId } = comment;
        const { date, time } = formatter.parseDate(createdDate); 
        const optimisticUpdateResult = dispatch(
          commentsApi.util.updateQueryData('getCommentsByMeetingId', meetingId, (draft) => {
            draft.push({ text, authorId, date, time, authorName: 'Test author', meetingId });
          }),
        )
        try {
          await queryFulfilled;
        } catch {
          optimisticUpdateResult.undo();
        }
      },
      invalidatesTags: (_, __, { meetingId }) => [{ type: 'Comments', id: meetingId }],
    }),
  })
});

export const {
  useGetCommentsByMeetingIdQuery,
  usePostCommentMutation,
} = commentsApi;