import {baseApi} from "@shared/api/baseApi.ts"
import type {
    Anomaly,
    AnomaliesResponse,
    AnomaliesQueryParams,
    AnomalyStats,
    AnomalyTimelinePoint
} from "@entities/anomalies/model/types.ts"

export const anomaliesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnomalies: builder.query<AnomaliesResponse, AnomaliesQueryParams>({
            query: (params) => {
                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
                )
                return {
                    url: '/anomalies',
                    params: cleanParams,
                }
            },
            providesTags: (result) => {
                if (result && result.items) {
                    return [
                        ...result.items.map(({ id }) => ({ type: 'Anomalies' as const, id })),
                        { type: 'Anomalies', id: 'LIST' },
                    ]
                }
                return [{ type: 'Anomalies', id: 'LIST' }]
            },
        }),

        getAnomalyStats: builder.query<AnomalyStats, void>({
            query: () => '/anomalies/stats',
            providesTags: ['Anomalies'],
        }),

        getAnomalyTimeline: builder.query<AnomalyTimelinePoint[], { period?: 'day' | 'week' | 'month' }>({
            query: (params) => ({
                url: '/anomalies/timeline',
                params,
            }),
            providesTags: ['Anomalies'],
        }),

        getAnomalyById: builder.query<Anomaly, string>({
            query: (id) => `/anomalies/${id}`,
            providesTags: (_, __, id) => [{ type: 'Anomalies', id }],
        }),

        updateAnomalyStatus: builder.mutation<Anomaly, { id: string; status: Anomaly['status']; notes?: string }>({
            query: ({ id, status, notes }) => ({
                url: `/anomalies/${id}/status`,
                method: 'PATCH',
                body: { status, notes },
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Anomalies', id },
                { type: 'Anomalies', id: 'LIST' },
            ],
        }),

        assignAnomaly: builder.mutation<Anomaly, { id: string; assignedTo: string }>({
            query: ({ id, assignedTo }) => ({
                url: `/anomalies/${id}/assign`,
                method: 'POST',
                body: { assignedTo },
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Anomalies', id },
                { type: 'Anomalies', id: 'LIST' },
            ],
        }),

        resolveAnomaly: builder.mutation<Anomaly, { id: string; notes?: string }>({
            query: ({ id, notes }) => ({
                url: `/anomalies/${id}/resolve`,
                method: 'POST',
                body: { notes },
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Anomalies', id },
                { type: 'Anomalies', id: 'LIST' },
            ],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetAnomaliesQuery,
    useGetAnomalyStatsQuery,
    useGetAnomalyTimelineQuery,
    useGetAnomalyByIdQuery,
    useUpdateAnomalyStatusMutation,
    useAssignAnomalyMutation,
    useResolveAnomalyMutation,
} = anomaliesApi