import {baseApi} from "@shared/api/baseApi"
import type {
    Report,
    ReportTemplate,
    ReportSchedule,
    ReportsSummary
} from "../model/types"

export const reportsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReports: builder.query<{
            items: Report[]
            total: number
            page: number
            limit: number
            totalPages: number
        }, {
            page?: number
            limit?: number
            type?: string
            status?: string
            format?: string
            search?: string
        }>({
            query: (params) => ({
                url: '/reports',
                params,
            }),
            providesTags: ['Reports'],
        }),

        getReportById: builder.query<Report, string>({
            query: (id) => `/reports/${id}`,
            providesTags: (_, __, id) => [{ type: 'Reports', id }],
        }),

        getReportsSummary: builder.query<ReportsSummary, void>({
            query: () => '/reports/summary',
            providesTags: ['Reports'],
        }),

        createReport: builder.mutation<Report, Partial<Report>>({
            query: (data) => ({
                url: '/reports',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Reports'],
        }),

        cancelReport: builder.mutation<Report, string>({
            query: (id) => ({
                url: `/reports/${id}/cancel`,
                method: 'POST',
            }),
            invalidatesTags: (_, __, id) => [
                { type: 'Reports', id },
                { type: 'Reports', id: 'LIST' },
            ],
        }),

        deleteReport: builder.mutation<void, string>({
            query: (id) => ({
                url: `/reports/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reports'],
        }),

        // Шаблоны
        getTemplates: builder.query<{
            items: ReportTemplate[]
            total: number
            page: number
            limit: number
            totalPages: number
        }, {
            page?: number
            limit?: number
            type?: string
            isSystem?: boolean
            search?: string
        }>({
            query: (params) => ({
                url: '/reports/templates',
                params,
            }),
            providesTags: ['Reports'],
        }),

        getTemplateById: builder.query<ReportTemplate, string>({
            query: (id) => `/reports/templates/${id}`,
        }),

        createTemplate: builder.mutation<ReportTemplate, Partial<ReportTemplate>>({
            query: (data) => ({
                url: '/reports/templates',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Reports'],
        }),

        updateTemplate: builder.mutation<ReportTemplate, { id: string; data: Partial<ReportTemplate> }>({
            query: ({ id, data }) => ({
                url: `/reports/templates/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Reports'],
        }),

        deleteTemplate: builder.mutation<void, string>({
            query: (id) => ({
                url: `/reports/templates/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reports'],
        }),

        // Расписания
        getSchedules: builder.query<{
            items: ReportSchedule[]
            total: number
            page: number
            limit: number
            totalPages: number
        }, {
            page?: number
            limit?: number
        }>({
            query: (params) => ({
                url: '/reports/schedules',
                params,
            }),
            providesTags: ['Reports'],
        }),

        getScheduleById: builder.query<ReportSchedule, string>({
            query: (id) => `/reports/schedules/${id}`,
        }),

        createSchedule: builder.mutation<ReportSchedule, Partial<ReportSchedule>>({
            query: (data) => ({
                url: '/reports/schedules',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Reports'],
        }),

        updateSchedule: builder.mutation<ReportSchedule, { id: string; data: Partial<ReportSchedule> }>({
            query: ({ id, data }) => ({
                url: `/reports/schedules/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Reports'],
        }),

        deleteSchedule: builder.mutation<void, string>({
            query: (id) => ({
                url: `/reports/schedules/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reports'],
        }),

        toggleSchedule: builder.mutation<ReportSchedule, string>({
            query: (id) => ({
                url: `/reports/schedules/${id}/toggle`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Reports'],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetReportsQuery,
    useGetReportByIdQuery,
    useGetReportsSummaryQuery,
    useCreateReportMutation,
    useCancelReportMutation,
    useDeleteReportMutation,
    useGetTemplatesQuery,
    useGetTemplateByIdQuery,
    useCreateTemplateMutation,
    useUpdateTemplateMutation,
    useDeleteTemplateMutation,
    useGetSchedulesQuery,
    useGetScheduleByIdQuery,
    useCreateScheduleMutation,
    useUpdateScheduleMutation,
    useDeleteScheduleMutation,
    useToggleScheduleMutation,
} = reportsApi