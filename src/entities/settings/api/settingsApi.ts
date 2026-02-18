import {baseApi} from "@shared/api/baseApi"
import type {
    UserProfile,
    UserPreferences,
    NotificationSettings,
    SecuritySettings,
    ApiKey
} from "../model/types"

export const settingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<UserProfile, void>({
            query: () => '/settings/profile',
            providesTags: ['Settings'],
        }),

        updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
            query: (data) => ({
                url: '/settings/profile',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Settings'],
        }),

        getPreferences: builder.query<UserPreferences, void>({
            query: () => '/settings/preferences',
            providesTags: ['Settings'],
        }),

        updatePreferences: builder.mutation<UserPreferences, Partial<UserPreferences>>({
            query: (data) => ({
                url: '/settings/preferences',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Settings'],
        }),

        getNotificationSettings: builder.query<NotificationSettings, void>({
            query: () => '/settings/notifications',
            providesTags: ['Settings'],
        }),

        updateNotificationSettings: builder.mutation<NotificationSettings, Partial<NotificationSettings>>({
            query: (data) => ({
                url: '/settings/notifications',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Settings'],
        }),

        getSecuritySettings: builder.query<SecuritySettings, void>({
            query: () => '/settings/security',
            providesTags: ['Settings'],
        }),

        updateSecuritySettings: builder.mutation<SecuritySettings, Partial<SecuritySettings>>({
            query: (data) => ({
                url: '/settings/security',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Settings'],
        }),

        getApiKeys: builder.query<{
            items: ApiKey[]
            total: number
            page: number
            limit: number
            totalPages: number
        }, {
            page?: number
            limit?: number
        }>({
            query: (params) => ({
                url: '/settings/api-keys',
                params,
            }),
            providesTags: ['Settings'],
        }),

        createApiKey: builder.mutation<ApiKey, Partial<ApiKey>>({
            query: (data) => ({
                url: '/settings/api-keys',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Settings'],
        }),

        deleteApiKey: builder.mutation<void, string>({
            query: (id) => ({
                url: `/settings/api-keys/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Settings'],
        }),

        toggleApiKey: builder.mutation<ApiKey, string>({
            query: (id) => ({
                url: `/settings/api-keys/${id}/toggle`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Settings'],
        }),

        enableTwoFactor: builder.mutation<{ success: boolean; message: string }, { method: string }>({
            query: (data) => ({
                url: '/settings/2fa/enable',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Settings'],
        }),

        disableTwoFactor: builder.mutation<{ success: boolean; message: string }, void>({
            query: () => ({
                url: '/settings/2fa/disable',
                method: 'POST',
            }),
            invalidatesTags: ['Settings'],
        }),

        verifyTwoFactor: builder.mutation<{ success: boolean; message: string }, { code: string }>({
            query: (data) => ({
                url: '/settings/2fa/verify',
                method: 'POST',
                body: data,
            }),
        }),

        changePassword: builder.mutation<{ success: boolean; message: string }, {
            oldPassword: string
            newPassword: string
        }>({
            query: (data) => ({
                url: '/settings/change-password',
                method: 'POST',
                body: data,
            }),
        }),

        getTrustedDevices: builder.query<SecuritySettings['trustedDevices'], void>({
            query: () => '/settings/trusted-devices',
            providesTags: ['Settings'],
        }),

        removeTrustedDevice: builder.mutation<void, string>({
            query: (id) => ({
                url: `/settings/trusted-devices/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Settings'],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetCurrentUserQuery,
    useUpdateProfileMutation,
    useGetPreferencesQuery,
    useUpdatePreferencesMutation,
    useGetNotificationSettingsQuery,
    useUpdateNotificationSettingsMutation,
    useGetSecuritySettingsQuery,
    useUpdateSecuritySettingsMutation,
    useGetApiKeysQuery,
    useCreateApiKeyMutation,
    useDeleteApiKeyMutation,
    useToggleApiKeyMutation,
    useEnableTwoFactorMutation,
    useDisableTwoFactorMutation,
    useVerifyTwoFactorMutation,
    useChangePasswordMutation,
    useGetTrustedDevicesQuery,
    useRemoveTrustedDeviceMutation,
} = settingsApi