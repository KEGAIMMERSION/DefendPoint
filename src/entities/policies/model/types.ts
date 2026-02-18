export type PolicyStatus = 'active' | 'inactive' | 'draft' | 'archived'
export type PolicyType = 'firewall' | 'ids' | 'ips' | 'access' | 'encryption' | 'audit'
export type PolicyPriority = 'critical' | 'high' | 'medium' | 'low'

export interface Policy {
    id: string
    name: string
    description: string
    type: PolicyType
    status: PolicyStatus
    priority: PolicyPriority
    rules: number
    createdAt: string
    updatedAt: string
    createdBy: string
    version: number
    tags: string[]
    lastExecuted?: string
    successRate?: number
}

export interface PoliciesResponse {
    items: Policy[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface PoliciesQueryParams {
    page?: number
    limit?: number
    type?: PolicyType
    status?: PolicyStatus
    priority?: PolicyPriority
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export interface PolicyStats {
    total: number
    active: number
    inactive: number
    draft: number
    byType: Record<PolicyType, number>
    byPriority: Record<PolicyPriority, number>
}