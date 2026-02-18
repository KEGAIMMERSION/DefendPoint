export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'html'
export type ReportType = 'security' | 'compliance' | 'audit' | 'performance' | 'custom'
export type ReportStatus = 'generating' | 'completed' | 'failed' | 'cancelled'
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'

export interface Report {
    id: string
    name: string
    description: string
    type: ReportType
    format: ReportFormat
    status: ReportStatus
    createdBy: string
    createdAt: string
    generatedAt?: string
    completedAt?: string
    period?: ReportPeriod
    dateRange: {
        start: string
        end: string
    }
    filters?: Record<string, any>
    size?: number
    url?: string
    error?: string
    tags: string[]
}

export interface ReportTemplate {
    id: string
    name: string
    description: string
    type: ReportType
    format: ReportFormat
    isSystem: boolean
    createdAt: string
    updatedAt: string
    config: Record<string, any>
}

export interface ReportSchedule {
    id: string
    reportId: string
    reportName: string
    period: ReportPeriod
    format: ReportFormat
    recipients: string[]
    nextRun: string
    lastRun?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export interface ReportsSummary {
    total: number
    completed: number
    generating: number
    failed: number
    byType: Record<ReportType, number>
    storageUsed: number
    scheduledCount: number
}