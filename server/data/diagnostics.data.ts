import {ServiceHealth, SystemMetrics, DiagnosticLog, DiagnosticsSummary} from "../types"

export const services: ServiceHealth[] = [
    {
        id: '1',
        name: 'PostgreSQL Database',
        type: 'database',
        status: 'healthy',
        uptime: 864000,
        responseTime: 45,
        lastChecked: new Date().toISOString(),
        metrics: {
            cpu: 23,
            memory: 45,
            disk: 62,
            connections: 47
        }
    },
    {
        id: '2',
        name: 'Redis Cache',
        type: 'cache',
        status: 'healthy',
        uptime: 432000,
        responseTime: 2,
        lastChecked: new Date().toISOString(),
        metrics: {
            cpu: 8,
            memory: 34,
            disk: 15,
            connections: 12
        }
    },
    {
        id: '3',
        name: 'RabbitMQ Queue',
        type: 'queue',
        status: 'degraded',
        uptime: 259200,
        responseTime: 156,
        lastChecked: new Date().toISOString(),
        message: 'Высокая задержка обработки сообщений',
        metrics: {
            cpu: 67,
            memory: 78,
            disk: 43,
            connections: 23
        }
    },
    {
        id: '4',
        name: 'MinIO Storage',
        type: 'storage',
        status: 'healthy',
        uptime: 604800,
        responseTime: 89,
        lastChecked: new Date().toISOString(),
        metrics: {
            cpu: 12,
            memory: 28,
            disk: 58
        }
    },
    {
        id: '5',
        name: 'Auth Service API',
        type: 'api',
        status: 'healthy',
        uptime: 345600,
        responseTime: 67,
        lastChecked: new Date().toISOString(),
        metrics: {
            cpu: 34,
            memory: 52,
            disk: 23,
            connections: 156
        }
    },
    {
        id: '6',
        name: 'Elasticsearch',
        type: 'database',
        status: 'down',
        uptime: 0,
        responseTime: 0,
        lastChecked: new Date().toISOString(),
        message: 'Сервис недоступен',
        metrics: {
            cpu: 0,
            memory: 0,
            disk: 0
        }
    }
]

export const systemMetrics: SystemMetrics = {
    timestamp: new Date().toISOString(),
    cpu: {
        usage: 42,
        cores: 8,
        loadAverage: [2.5, 3.1, 2.8]
    },
    memory: {
        total: 17179869184,
        used: 11811160064,
        free: 5368709120,
        cached: 2147483648,
        usagePercent: 68.7
    },
    disk: {
        total: 536870912000,
        used: 375809638400,
        free: 161061273600,
        usagePercent: 70
    },
    network: {
        bytesIn: 15728640,
        bytesOut: 8388608,
        connections: 1247,
        errors: 2
    }
}

export const diagnosticLogs: DiagnosticLog[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: 'info',
        component: 'PostgreSQL',
        message: 'База данных запущена',
        details: { pid: 1234, port: 5432 }
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        level: 'warning',
        component: 'RabbitMQ',
        message: 'Высокая загрузка очереди',
        details: { queueLength: 234, consumers: 5 }
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        level: 'error',
        component: 'Elasticsearch',
        message: 'Не удалось подключиться к кластеру',
        details: { attempt: 3, timeout: 5000 }
    },
    {
        id: '4',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        level: 'info',
        component: 'Auth Service',
        message: 'Новый пользователь зарегистрирован',
        details: { userId: 'usr_123', method: 'google' }
    },
    {
        id: '5',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        level: 'debug',
        component: 'Redis',
        message: 'Кэш очищен',
        details: { keysRemoved: 1567, duration: 234 }
    }
]

export const diagnosticsSummary: DiagnosticsSummary = {
    overall: 'degraded',
    totalServices: services.length,
    healthyServices: services.filter(s => s.status === 'healthy').length,
    degradedServices: services.filter(s => s.status === 'degraded').length,
    downServices: services.filter(s => s.status === 'down').length,
    avgResponseTime: Math.round(
        services
            .filter(s => s.status !== 'down')
            .reduce((acc, s) => acc + s.responseTime, 0) /
        services.filter(s => s.status !== 'down').length
    ),
    criticalAlerts: 1,
    warnings: 2
}