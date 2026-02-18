import {threats} from "../data"

interface ThreatsQuery {
    page?: number
    limit?: number
    severity?: string
    search?: string
}

export class ThreatsService {
    getThreats(query: ThreatsQuery) {
        let filtered = [...threats]

        if (query.severity) {
            filtered = filtered.filter(t => t.severity === query.severity)
        }

        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(t =>
                t.name.toLowerCase().includes(searchLower)
            )
        }

        const page = query.page || 1
        const limit = query.limit || 10
        const start = (page - 1) * limit
        const end = start + limit

        return {
            items: filtered.slice(start, end),
            total: filtered.length,
            page,
            limit,
            totalPages: Math.ceil(filtered.length / limit)
        }
    }

    getThreatById(id: string) {
        return threats.find(t => t.id === id)
    }

    updateThreatStatus(id: string, status: string) {
        const threat = threats.find(t => t.id === id)
        if (threat) {
            threat.status = status as any
        }
        return threat
    }
}