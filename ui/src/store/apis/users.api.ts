import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiMethods } from '../../services/ApiMethods';
import { User } from '../../models/User.model';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/users' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => '',
      providesTags: [{ type: 'Users', id: 'LIST'}],
    }),
    getUsersByIds: builder.query<User[], string[]>({
      query: (ids) => ({
        method: ApiMethods.POST,
        url: '/byId', 
        body: { ids },
      }),
      providesTags: (_, __, ids) => (ids.map((id) => ({ type: 'Users', id })))
    }),
  })
});

export const { 
  useGetAllUsersQuery,
  useGetUsersByIdsQuery,
 } = usersApi;