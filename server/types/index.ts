export interface PaginationQuery {
    page?: number
    limit?: number
}

export interface PaginatedResponse<T> {
    items: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

export interface ErrorResponse {
    message: string
    status: number
    timestamp: string
}

export interface ServiceHealth {
    id: string
    name: string
    type: ComponentType
    status: ServiceStatus
    uptime: number
    responseTime: number
    lastChecked: string
    message?: string
    metrics: {
        cpu: number
        memory: number
        disk: number
        connections?: number
    }
}

export interface SystemMetrics {
    timestamp: string
    cpu: {
        usage: number
        cores: number
        loadAverage: number[]
    }
    memory: {
        total: number
        used: number
        free: number
        cached: number
        usagePercent: number
    }
    disk: {
        total: number
        used: number
        free: number
        usagePercent: number
    }
    network: {
        bytesIn: number
        bytesOut: number
        connections: number
        errors: number
    }
}

export interface DiagnosticLog {
    id: string
    timestamp: string
    level: 'info' | 'warning' | 'error' | 'debug'
    component: string
    message: string
    details?: Record<string, any>
}

export interface DiagnosticsSummary {
    overall: ServiceStatus
    totalServices: number
    healthyServices: number
    degradedServices: number
    downServices: number
    avgResponseTime: number
    criticalAlerts: number
    warnings: number
}

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

export interface UserProfile {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    role: string
    department?: string
    phone?: string
    avatar?: string
    createdAt: string
    lastLogin?: string
    lastActive?: string
    isActive: boolean
    isVerified: boolean
}

export interface UserPreferences {
    userId: string
    theme: ThemeMode
    language: Language
    timezone: Timezone
    dateFormat: string
    timeFormat: '12h' | '24h'
    firstDayOfWeek: 'monday' | 'sunday'
    itemsPerPage: number
    dashboardLayout?: Record<string, any>
    favoritePages: string[]
    shortcuts: Array<{
        key: string
        action: string
        description: string
    }>
}

export interface NotificationSettings {
    userId: string
    email: {
        level: NotificationLevel
        criticalAlerts: boolean
        weeklyDigest: boolean
        monthlyReport: boolean
    }
    push: {
        enabled: boolean
        level: NotificationLevel
        desktop: boolean
        mobile: boolean
    }
    inApp: {
        enabled: boolean
        level: NotificationLevel
        sound: boolean
        popup: boolean
    }
    digest: {
        enabled: boolean
        frequency: 'daily' | 'weekly' | 'monthly'
        time: string
    }
}

export interface SecuritySettings {
    userId: string
    twoFactor: {
        enabled: boolean
        method: TwoFactorMethod
        verified: boolean
    }
    sessionTimeout: number
    maxSessions: number
    ipWhitelist: string[]
    loginNotifications: boolean
    passwordExpiryDays: number
    requireMFAForSensitive: boolean
    trustedDevices: Array<{
        id: string
        name: string
        lastUsed: string
        ip: string
    }>
}

export interface SystemSettings {
    general: {
        siteName: string
        siteUrl: string
        supportEmail: string
        maintenanceMode: boolean
        maintenanceMessage?: string
        defaultLanguage: Language
        registrationEnabled: boolean
    }
    security: {
        passwordMinLength: number
        passwordRequireNumbers: boolean
        passwordRequireSymbols: boolean
        maxLoginAttempts: number
        lockoutDuration: number
        sessionTimeout: number
        mfaRequired: boolean
        mfaEnforcedRoles: string[]
    }
    notifications: {
        emailFrom: string
        smtpServer: string
        smtpPort: number
        smtpSecure: boolean
        pushEnabled: boolean
    }
    logging: {
        logLevel: 'debug' | 'info' | 'warn' | 'error'
        retentionDays: number
        auditLogEnabled: boolean
    }
    integrations: Array<{
        id: string
        name: string
        type: string
        enabled: boolean
        config: Record<string, any>
    }>
}

export interface ApiKey {
    id: string
    userId: string
    name: string
    key: string
    permissions: string[]
    createdAt: string
    lastUsed?: string
    expiresAt?: string
    isActive: boolean
}

export interface AuditLogEntry {
    id: string
    userId: string
    username: string
    action: string
    resource: string
    details: Record<string, any>
    ip: string
    userAgent: string
    timestamp: string
    status: 'success' | 'failure'
}

export type AnomalySeverity = 'critical' | 'high' | 'medium' | 'low'
export type AnomalyStatus = 'new' | 'investigating' | 'resolved' | 'ignored'
export type AnomalyType = 'traffic' | 'behavior' | 'performance' | 'security' | 'compliance'

export type AuthEventType = 'login' | 'logout' | 'failed_login' | 'password_change' | 'mfa' | 'permission_change'
export type AuthStatus = 'success' | 'failure' | 'blocked' | 'suspicious'
export type AuthMethod = 'password' | 'mfa' | 'sso' | 'certificate' | 'token'

export type ServiceStatus = 'healthy' | 'degraded' | 'down' | 'maintenance'
export type ComponentType = 'database' | 'api' | 'cache' | 'queue' | 'storage' | 'service'

export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'html'
export type ReportType = 'security' | 'compliance' | 'audit' | 'performance' | 'custom'
export type ReportStatus = 'generating' | 'completed' | 'failed' | 'cancelled'
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'

export type ThemeMode = 'light' | 'dark' | 'system'
export type Language = 'ru' | 'en' | 'es' | 'de' | 'fr' | 'zh'
export type Timezone = string
export type NotificationLevel = 'all' | 'critical' | 'important' | 'none'
export type TwoFactorMethod = 'app' | 'sms' | 'email' | 'none'
