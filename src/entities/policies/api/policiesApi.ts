import {baseApi} from "@shared/api/baseApi.ts"
import type {Policy, PoliciesResponse, PoliciesQueryParams, PolicyStats} from "@entities/policies/model/types.ts"

export const policiesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPolicies: builder.query<PoliciesResponse, PoliciesQueryParams>({
            query: (params) => {
                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v !== undefined && v !== '')
                )
                return {
                    url: '/policies',
                    params: cleanParams,
                }
            },
            providesTags: (result) => {
                if (result && result.items) {
                    return [
                        ...result.items.map(({ id }) => ({ type: 'Policies' as const, id })),
                        { type: 'Policies', id: 'LIST' },
                    ]
                }
                return [{ type: 'Policies', id: 'LIST' }]
            },
        }),

        getPolicyById: builder.query<Policy, string>({
            query: (id) => `/policies/${id}`,
            providesTags: (_, __, id) => [{ type: 'Policies', id }],
        }),

        getPolicyStats: builder.query<PolicyStats, void>({
            query: () => '/policies/stats',
            providesTags: ['Policies'],
        }),

        createPolicy: builder.mutation<Policy, Partial<Policy>>({
            query: (policy) => ({
                url: '/policies',
                method: 'POST',
                body: policy,
            }),
            invalidatesTags: ['Policies'],
        }),

        updatePolicy: builder.mutation<Policy, { id: string; policy: Partial<Policy> }>({
            query: ({ id, policy }) => ({
                url: `/policies/${id}`,
                method: 'PUT',
                body: policy,
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Policies', id },
                { type: 'Policies', id: 'LIST' },
            ],
        }),

        updatePolicyStatus: builder.mutation<Policy, { id: string; status: Policy['status'] }>({
            query: ({ id, status }) => ({
                url: `/policies/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Policies', id },
                { type: 'Policies', id: 'LIST' },
            ],
        }),

        deletePolicy: builder.mutation<void, string>({
            query: (id) => ({
                url: `/policies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Policies'],
        }),

        executePolicy: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/policies/${id}/execute`,
                method: 'POST',
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetPoliciesQuery,
    useGetPolicyByIdQuery,
    useGetPolicyStatsQuery,
    useCreatePolicyMutation,
    useUpdatePolicyMutation,
    useUpdatePolicyStatusMutation,
    useDeletePolicyMutation,
    useExecutePolicyMutation,
} = policiesApi
