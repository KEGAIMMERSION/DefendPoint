import {trafficFlows, trafficStats} from "../data"
import {PaginationQuery} from "../types"
import {applyPagination} from "../utils/pagination.util"

export class TrafficService {
    getTraffic(query: PaginationQuery & {
        protocol?: string
        direction?: string
        status?: string
        search?: string
    }) {
        let filtered = [...trafficFlows]
        if (query.protocol) {
            filtered = filtered.filter(f => f.protocol === query.protocol)
        }

        if (query.direction) {
            filtered = filtered.filter(f => f.direction === query.direction)
        }
        if (query.status) {
            filtered = filtered.filter(f => f.status === query.status)
        }
        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(f =>
                f.sourceIp.includes(searchLower) ||
                f.destinationIp.includes(searchLower) ||
                f.application?.toLowerCase().includes(searchLower)
            )
        }
        return applyPagination(filtered, query)
    }

    getStats() {
        return trafficStats
    }

    getBandwidthHistory(interval: string = 'day') {
        let data = [...trafficStats.bandwidthUsage]

        if (interval === 'week') {
            data = Array.from({ length: 7 }, (_, i) => ({
                time: `Day ${i + 1}`,
                inbound: 50000 + Math.random() * 50000,
                outbound: 40000 + Math.random() * 40000
            }))
        }

        return data
    }

    getProtocolDistribution() {
        return [
            { protocol: 'TCP', bytes: 1452000, packets: 1750, flows: 3 },
            { protocol: 'UDP', bytes: 4500, packets: 15, flows: 1 },
            { protocol: 'ICMP', bytes: 1200, packets: 8, flows: 0 },
            { protocol: 'HTTP', bytes: 45000, packets: 60, flows: 1 },
            { protocol: 'HTTPS', bytes: 1765000, packets: 1570, flows: 2 }
        ]
    }

    getTrafficById(id: string) {
        return trafficFlows.find(f => f.id === id)
    }

    blockTraffic(id: string) {
        const flow = trafficFlows.find(f => f.id === id)
        if (!flow) return null

        flow.status = 'blocked'
        return { success: true }
    }

    allowTraffic(id: string) {
        const flow = trafficFlows.find(f => f.id === id)
        if (!flow) return null

        flow.status = 'allowed'
        return { success: true }
    }
}