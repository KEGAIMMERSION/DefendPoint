import {baseApi} from "@shared/api/baseApi"
import type {
    ServiceHealth,
    SystemMetrics,
    DiagnosticLog,
    DiagnosticsSummary
} from "../model/types"

export const diagnosticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<ServiceHealth[], void>({
            query: () => '/diagnostics/services',
            providesTags: ['Diagnostics'],
        }),

        getSystemMetrics: builder.query<SystemMetrics, void>({
            query: () => '/diagnostics/metrics',
            providesTags: ['Diagnostics'],
        }),

        getSummary: builder.query<DiagnosticsSummary, void>({
            query: () => '/diagnostics/summary',
            providesTags: ['Diagnostics'],
        }),

        getLogs: builder.query<{
            items: DiagnosticLog[]
            total: number
            page: number
            limit: number
            totalPages: number
        }, {
            page?: number
            limit?: number
            level?: string
            component?: string
            search?: string
        }>({
            query: (params) => ({
                url: '/diagnostics/logs',
                params,
            }),
            providesTags: ['Diagnostics'],
        }),

        getServiceById: builder.query<ServiceHealth, string>({
            query: (id) => `/diagnostics/services/${id}`,
            providesTags: (_, __, id) => [{ type: 'Diagnostics', id }],
        }),

        restartService: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/diagnostics/services/${id}/restart`,
                method: 'POST',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'Diagnostics', id },
                { type: 'Diagnostics', id: 'LIST' },
            ],
        }),

        stopService: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/diagnostics/services/${id}/stop`,
                method: 'POST',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'Diagnostics', id },
                { type: 'Diagnostics', id: 'LIST' },
            ],
        }),

        startService: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/diagnostics/services/${id}/start`,
                method: 'POST',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'Diagnostics', id },
                { type: 'Diagnostics', id: 'LIST' },
            ],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetServicesQuery,
    useGetSystemMetricsQuery,
    useGetSummaryQuery,
    useGetLogsQuery,
    useGetServiceByIdQuery,
    useRestartServiceMutation,
    useStopServiceMutation,
    useStartServiceMutation,
} = diagnosticsApi