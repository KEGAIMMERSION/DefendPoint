import {baseApi} from "@shared/api/baseApi"
import type {LogEntry, LogStats} from "../model/types"

export const logsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLogs: builder.query<{
            items: LogEntry[]
            total: number
            page: number
            limit: number
            totalPages: number
        }, {
            page?: number
            limit?: number
            level?: string
            source?: string
            component?: string
            startDate?: string
            endDate?: string
            search?: string
        }>({
            query: (params) => ({
                url: '/logs',
                params,
            }),
            providesTags: ['Logs'],
        }),

        getLogStats: builder.query<LogStats, { period?: 'hour' | 'day' | 'week' }>({
            query: (params) => ({
                url: '/logs/stats',
                params,
            }),
            providesTags: ['Logs'],
        }),

        getLogById: builder.query<LogEntry, string>({
            query: (id) => `/logs/${id}`,
            providesTags: (_, __, id) => [{ type: 'Logs', id }],
        }),

        clearLogs: builder.mutation<void, { olderThan?: string }>({
            query: (params) => ({
                url: '/logs/clear',
                method: 'POST',
                params,
            }),
            invalidatesTags: ['Logs'],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetLogsQuery,
    useGetLogStatsQuery,
    useGetLogByIdQuery,
    useClearLogsMutation,
} = logsApi