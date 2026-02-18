import {services, systemMetrics, diagnosticLogs, diagnosticsSummary} from "../data/diagnostics.data"
import {PaginationQuery} from "../types"
import {applyPagination} from "../utils"

interface LogsQuery extends PaginationQuery {
    level?: string
    component?: string
    search?: string
}

export class DiagnosticsService {
    getServices() {
        return services
    }

    getSystemMetrics() {
        return systemMetrics
    }

    getSummary() {
        return diagnosticsSummary
    }

    getLogs(query: LogsQuery) {
        let filtered = [...diagnosticLogs]

        if (query.level) {
            filtered = filtered.filter(log => log.level === query.level)
        }

        if (query.component) {
            const componentLower = query.component.toLowerCase()
            filtered = filtered.filter(log =>
                log.component.toLowerCase().includes(componentLower)
            )
        }

        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(log =>
                log.message.toLowerCase().includes(searchLower) ||
                log.component.toLowerCase().includes(searchLower)
            )
        }

        return applyPagination(filtered, query)
    }

    getServiceById(id: string) {
        return services.find(s => s.id === id)
    }

    getLogById(id: string) {
        return diagnosticLogs.find(log => log.id === id)
    }

    restartService(id: string) {
        const service = services.find(s => s.id === id)
        if (!service) return null

        service.status = 'healthy'
        service.uptime = 0
        service.lastChecked = new Date().toISOString()
        service.message = 'Сервис перезапущен'

        return { success: true, message: `Сервис ${service.name} перезапущен` }
    }

    stopService(id: string) {
        const service = services.find(s => s.id === id)
        if (!service) return null

        service.status = 'down'
        service.message = 'Сервис остановлен вручную'
        service.lastChecked = new Date().toISOString()

        return { success: true, message: `Сервис ${service.name} остановлен` }
    }

    startService(id: string) {
        const service = services.find(s => s.id === id)
        if (!service) return null

        service.status = 'healthy'
        service.message = 'Сервис запущен'
        service.lastChecked = new Date().toISOString()

        return { success: true, message: `Сервис ${service.name} запущен` }
    }
}