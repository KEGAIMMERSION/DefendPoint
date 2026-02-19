import {baseApi} from "@shared/api/baseApi.ts"

export interface DashboardStats {
    totalEvents: number
    criticalThreats: number
    uniqueIPs: number
    averageRisk: number
    revenue: number
    topOrders: Array<{
        name: string
        value: number
        change: number
        today: number
        suffix?: string
    }>
}

export interface TrafficData {
    labels: string[]
    datasets: Array<{
        label: string
        data: number[]
        borderColor: string
    }>
}

export interface ThreatByType {
    name: string
    value: number
    color: string
}

export interface HourlyActivity {
    hour: string
    count: number
}

export interface TopAttacker {
    ip: string
    attacks: number
    country: string
}

export interface Reminder {
    id: number
    title: string
    priority: 'high' | 'medium' | 'low'
    due: string
}

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

        getThreatsByType: builder.query<ThreatByType[], void>({
            query: () => '/dashboard/threats-by-type',
            providesTags: ['Dashboard'],
        }),

        getHourlyActivity: builder.query<HourlyActivity[], void>({
            query: () => '/dashboard/hourly-activity',
            providesTags: ['Dashboard'],
        }),

        getTopAttackers: builder.query<TopAttacker[], void>({
            query: () => '/dashboard/top-attackers',
            providesTags: ['Dashboard'],
        }),

        getReminders: builder.query<Reminder[], void>({
            query: () => '/dashboard/reminders',
            providesTags: ['Dashboard'],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetDashboardStatsQuery,
    useGetTrafficDataQuery,
    useGetThreatsByTypeQuery,
    useGetHourlyActivityQuery,
    useGetTopAttackersQuery,
    useGetRemindersQuery,
} = dashboardApi