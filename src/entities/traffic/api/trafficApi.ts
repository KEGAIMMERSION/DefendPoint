import {baseApi} from "@shared/api/baseApi.ts"
import type {
    TrafficResponse,
    TrafficQueryParams,
    TrafficStats,
    BandwidthData,
    ProtocolDistribution,
    TrafficFlow
} from "@entities/traffic/model/types.ts"

export const trafficApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTraffic: builder.query<TrafficResponse, TrafficQueryParams>({
            query: (params) => {
                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
                )
                return {
                    url: '/traffic',
                    params: cleanParams,
                }
            },
            providesTags: (result) => {
                if (result && result.items) {
                    return [
                        ...result.items.map(({ id }) => ({ type: 'Traffic' as const, id })),
                        { type: 'Traffic', id: 'LIST' },
                    ]
                }
                return [{ type: 'Traffic', id: 'LIST' }]
            },
        }),

        getTrafficStats: builder.query<TrafficStats, void>({
            query: () => '/traffic/stats',
            providesTags: ['Traffic'],
        }),

        getBandwidthHistory: builder.query<BandwidthData[], { interval?: 'hour' | 'day' | 'week' }>({
            query: (params) => ({
                url: '/traffic/bandwidth',
                params,
            }),
            providesTags: ['Traffic'],
        }),

        getProtocolDistribution: builder.query<ProtocolDistribution[], { period?: 'today' | 'week' | 'month' }>({
            query: (params) => ({
                url: '/traffic/protocols',
                params,
            }),
            providesTags: ['Traffic'],
        }),

        getTrafficById: builder.query<TrafficFlow, string>({
            query: (id) => `/traffic/${id}`,
            providesTags: (_, __, id) => [{ type: 'Traffic', id }],
        }),

        blockTraffic: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/traffic/${id}/block`,
                method: 'POST',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'Traffic', id },
                { type: 'Traffic', id: 'LIST' },
            ],
        }),

        allowTraffic: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/traffic/${id}/allow`,
                method: 'POST',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'Traffic', id },
                { type: 'Traffic', id: 'LIST' },
            ],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetTrafficQuery,
    useGetTrafficStatsQuery,
    useGetBandwidthHistoryQuery,
    useGetProtocolDistributionQuery,
    useGetTrafficByIdQuery,
    useBlockTrafficMutation,
    useAllowTrafficMutation,
} = trafficApi