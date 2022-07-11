import { api } from './api'

export class User {
    id: string = ''
    first_name: string = ''
    last_name: string = ''
    name: string = ''
    job: string = ''
}

export class UsersResponse {
    data: User[] = []
    page: number = 0
    per_page: number = 0
    total: number = 0
    total_pages: number = 0
}

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<UsersResponse, void>({
            query: () => `https://reqres.in/api/users`,
            providesTags: (result = new UsersResponse()) => [
                ...result.data.map(({ id }) => ({ type: 'User', id } as const)),
                { type: 'User' as const, id: 'LIST' },
            ],
        }),
        getUserById: build.query<User, string>({
            query: (id: string) => `https://reqres.in/api/users/${id}`,
            providesTags: (_result, _err, id) => [{ type: 'User', id }],
        }),
        createUser: build.mutation<User, Partial<User>>({
            query(body) {
              return {
                url: `https://reqres.in/api/users`,
                method: 'POST',
                body,
              }
            },
            invalidatesTags: ['User'],
          }),
    })
})

// Export hooks for usage in functional components
export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
} = userApi