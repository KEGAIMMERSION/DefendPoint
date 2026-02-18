import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const tagTypes = [
    'Dashboard',
    'Threats',
    'Events',
    'Policies',
    'Anomalies',
    'Traffic',
    'AuthLogs',
    'Logs',
    'Diagnostics',
    'Reports',
    'Settings',
] as const

export type TagTypes = typeof tagTypes[number]
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: tagTypes,
    endpoints: () => ({}),
})