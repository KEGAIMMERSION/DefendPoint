export type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'trace'
export type LogSource = 'system' | 'application' | 'security' | 'audit' | 'network'

export interface LogEntry {
    id: string
    timestamp: string
    level: LogLevel
    source: LogSource
    component: string
    message: string
    details?: Record<string, any>
    userId?: string
    username?: string
    ip?: string
    sessionId?: string
    requestId?: string
    tags: string[]
}

export interface LogStats {
    total: number
    byLevel: Record<LogLevel, number>
    bySource: Record<LogSource, number>
    lastHour: number
    lastDay: number
    errorsLastHour: number
}