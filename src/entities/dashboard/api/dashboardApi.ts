import {baseApi} from "@shared/api/baseApi.ts"
import type {DashboardStats, TrafficData} from "@entities/dashboard/model/types.ts"

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query<DashboardStats, void>({
            query: () => '/dashboard/stats',
            providesTags: ['Dashboard'],
        }),
        getTrafficData: builder.query<TrafficData, void>({
            query: () => '/dashboard/traffic',
            providesTags: ['Dashboard'],
        }),
    }),
    overrideExisting: false,
})

export const {useGetDashboardStatsQuery, useGetTrafficDataQuery} = dashboardApi