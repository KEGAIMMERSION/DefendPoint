export type AnomalySeverity = 'critical' | 'high' | 'medium' | 'low'
export type AnomalyStatus = 'new' | 'investigating' | 'resolved' | 'ignored'
export type AnomalyType = 'traffic' | 'behavior' | 'performance' | 'security' | 'compliance'

export interface Anomaly {
    id: string
    name: string
    description: string
    type: AnomalyType
    severity: AnomalySeverity
    status: AnomalyStatus
    source: string
    timestamp: string
    value: number
    threshold: number
    unit: string
    confidence: number // 0-100
    affectedAssets: string[]
    tags: string[]
    assignedTo?: string
    resolvedAt?: string
    notes?: string
}

export interface AnomaliesResponse {
    items: Anomaly[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface AnomaliesQueryParams {
    page?: number
    limit?: number
    type?: AnomalyType
    severity?: AnomalySeverity
    status?: AnomalyStatus
    startDate?: string
    endDate?: string
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export interface AnomalyStats {
    total: number
    bySeverity: Record<AnomalySeverity, number>
    byStatus: Record<AnomalyStatus, number>
    byType: Record<AnomalyType, number>
    averageConfidence: number
    criticalCount: number
    newCount: number
    resolvedToday: number
}

export interface AnomalyTimelinePoint {
    timestamp: string
    count: number
    severity: AnomalySeverity
}