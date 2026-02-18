export type ThreatSeverity = 'critical' | 'high' | 'medium' | 'low'
export type ThreatStatus = 'active' | 'investigating' | 'resolved'

export interface Threat {
    id: string
    name: string
    count: number
    severity: ThreatSeverity
    status: ThreatStatus
}

export interface ThreatsResponse {
    items: Threat[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ThreatsQueryParams {
    page?: number
    limit?: number
    severity?: ThreatSeverity
    status?: ThreatStatus
    search?: string
}