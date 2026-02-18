export type ServiceStatus = 'healthy' | 'degraded' | 'down' | 'maintenance'
export type ComponentType = 'database' | 'api' | 'cache' | 'queue' | 'storage' | 'service'
export type LogLevel = 'info' | 'warning' | 'error' | 'debug'

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
    level: LogLevel
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