import {authLogs, authStats} from "../data"
import {PaginationQuery} from "../types"
import {applyPagination} from "../utils"

interface AuthLogsQuery extends PaginationQuery {
    eventType?: string
    status?: string
    username?: string
    search?: string
}

export class AuthLogsService {
    getAuthLogs(query: AuthLogsQuery) {
        let filtered = [...authLogs]

        if (query.eventType) {
            filtered = filtered.filter(log => log.eventType === query.eventType)
        }

        if (query.status) {
            filtered = filtered.filter(log => log.status === query.status)
        }

        if (query.username) {
            filtered = filtered.filter(log =>
                log.username.toLowerCase().includes(query.username!.toLowerCase())
            )
        }

        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(log =>
                log.username.toLowerCase().includes(searchLower) ||
                log.ipAddress.includes(searchLower) ||
                (log.location && log.location.toLowerCase().includes(searchLower))
            )
        }

        return applyPagination(filtered, query)
    }

    getStats() {
        return authStats
    }

    getAuthLogById(id: string) {
        return authLogs.find(log => log.id === id)
    }
}