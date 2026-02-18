import {baseApi} from "@shared/api/baseApi.ts"
import type {AuthLogsResponse, AuthLogsQueryParams, AuthStats, AuthLog} from "@entities/auth-logs/model/types.ts"

export const authLogsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAuthLogs: builder.query<AuthLogsResponse, AuthLogsQueryParams>({
            query: (params) => {
                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
                )
                return {
                    url: '/auth-logs',
                    params: cleanParams,
                }
            },
            providesTags: (result) => {
                if (result && result.items) {
                    return [
                        ...result.items.map(({ id }) => ({ type: 'AuthLogs' as const, id })),
                        { type: 'AuthLogs', id: 'LIST' },
                    ]
                }
                return [{ type: 'AuthLogs', id: 'LIST' }]
            },
        }),

        getAuthStats: builder.query<AuthStats, { period?: 'day' | 'week' | 'month' }>({
            query: (params) => ({
                url: '/auth-logs/stats',
                params,
            }),
            providesTags: ['AuthLogs'],
        }),

        getAuthLogById: builder.query<AuthLog, string>({
            query: (id) => `/auth-logs/${id}`,
            providesTags: (_, __, id) => [{ type: 'AuthLogs', id }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAuthLogsQuery,
    useGetAuthStatsQuery,
    useGetAuthLogByIdQuery,
} = authLogsApi