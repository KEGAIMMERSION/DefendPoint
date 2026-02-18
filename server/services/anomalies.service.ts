import {anomalies, anomalyStats} from "../data"
import {PaginationQuery} from "../types"
import {applyPagination} from "../utils"

interface AnomaliesQuery extends PaginationQuery {
    type?: string
    severity?: string
    status?: string
    search?: string
}

export class AnomaliesService {
    getAnomalies(query: AnomaliesQuery) {
        let filtered = [...anomalies]

        if (query.type) {
            filtered = filtered.filter(a => a.type === query.type)
        }

        if (query.severity) {
            filtered = filtered.filter(a => a.severity === query.severity)
        }

        if (query.status) {
            filtered = filtered.filter(a => a.status === query.status)
        }

        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(a =>
                a.name.toLowerCase().includes(searchLower) ||
                a.description.toLowerCase().includes(searchLower) ||
                a.source.toLowerCase().includes(searchLower)
            )
        }

        return applyPagination(filtered, query)
    }

    getStats() {
        return anomalyStats
    }

    getAnomalyById(id: string) {
        return anomalies.find(a => a.id === id)
    }

    updateAnomalyStatus(id: string, status: string, notes?: string) {
        const anomaly = anomalies.find(a => a.id === id)
        if (!anomaly) return null

        anomaly.status = status as any
        if (notes) {
            anomaly.notes = notes
        }
        return anomaly
    }

    assignAnomaly(id: string, assignedTo: string) {
        const anomaly = anomalies.find(a => a.id === id)
        if (!anomaly) return null

        anomaly.assignedTo = assignedTo
        if (anomaly.status === 'new') {
            anomaly.status = 'investigating'
        }
        return anomaly
    }

    resolveAnomaly(id: string, notes?: string) {
        const anomaly = anomalies.find(a => a.id === id)
        if (!anomaly) return null

        anomaly.status = 'resolved'
        anomaly.resolvedAt = new Date().toISOString()
        if (notes) {
            anomaly.notes = notes
        }
        return anomaly
    }

    getTimelineData(period: string = 'day') {
        const points = period === 'day' ? 24 : period === 'week' ? 7 : 30
        const data = []

        for (let i = 0; i < points; i++) {
            const timestamp = new Date()
            if (period === 'day') {
                timestamp.setHours(timestamp.getHours() - (points - i))
                data.push({
                    timestamp: timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                    count: Math.floor(Math.random() * 10) + 1,
                    severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)]
                })
            } else if (period === 'week') {
                timestamp.setDate(timestamp.getDate() - (points - i))
                data.push({
                    timestamp: timestamp.toLocaleDateString('ru-RU', { weekday: 'short' }),
                    count: Math.floor(Math.random() * 20) + 5,
                    severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)]
                })
            } else {
                timestamp.setDate(timestamp.getDate() - (points - i))
                data.push({
                    timestamp: timestamp.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
                    count: Math.floor(Math.random() * 30) + 10,
                    severity: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)]
                })
            }
        }

        return data
    }
}