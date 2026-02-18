export type AuthEventType = 'login' | 'logout' | 'failed_login' | 'password_change' | 'mfa' | 'permission_change'
export type AuthStatus = 'success' | 'failure' | 'blocked' | 'suspicious'
export type AuthMethod = 'password' | 'mfa' | 'sso' | 'certificate' | 'token'

export interface AuthLog {
    id: string
    timestamp: string
    eventType: AuthEventType
    status: AuthStatus
    username: string
    userRole: string
    ipAddress: string
    location?: string
    device?: string
    browser?: string
    os?: string
    authMethod: AuthMethod
    duration?: number
    failureReason?: string
    additionalInfo?: Record<string, any>
}

export interface AuthLogsResponse {
    items: AuthLog[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface AuthLogsQueryParams {
    page?: number
    limit?: number
    eventType?: AuthEventType
    status?: AuthStatus
    username?: string
    startDate?: string
    endDate?: string
    ipAddress?: string
    search?: string
}

export interface AuthStats {
    totalLogins: number
    successfulLogins: number
    failedLogins: number
    blockedAttempts: number
    uniqueUsers: number
    mfaUsage: number
    averageSessionDuration: number
    loginsByHour: Array<{ hour: number; count: number }>
    topLocations: Array<{ location: string; count: number }>
    recentActivity: Array<{ date: string; success: number; failure: number }>
}