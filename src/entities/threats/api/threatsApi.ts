import {baseApi} from "@shared/api/baseApi.ts"
import type {Threat, ThreatsResponse, ThreatsQueryParams} from "@entities/threats/model/types.ts"

export const threatsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getThreats: builder.query<ThreatsResponse, ThreatsQueryParams>({
            query: (params) => {
                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
                )
                return {
                    url: '/threats',
                    params: cleanParams,
                }
            },
            providesTags: (result) => {
                if (result && result.items) {
                    return [
                        ...result.items.map(({ id }) => ({ type: 'Threats' as const, id })),
                        { type: 'Threats', id: 'LIST' },
                    ]
                }
                return [{ type: 'Threats', id: 'LIST' }]
            },
        }),

        getThreatById: builder.query<Threat, string>({
            query: (id) => `/threats/${id}`,
            providesTags: (_, __, id) => [{ type: 'Threats', id }],
        }),

        updateThreatStatus: builder.mutation<
            Threat,
            { id: string; status: Threat['status'] }
        >({
            query: ({ id, status }) => ({
                url: `/threats/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Threats', id },
                { type: 'Threats', id: 'LIST' },
            ],
        }),
    }),
    overrideExisting: false,
})

export const {useGetThreatsQuery, useGetThreatByIdQuery, useUpdateThreatStatusMutation,} = threatsApi