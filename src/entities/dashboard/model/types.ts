export interface DashboardStats {
    totalEvents: number
    criticalThreats: number
    uniqueIPs: number
    averageRisk: number
    revenue: number
    topOrders: Array<{
        name: string
        value: number
        change: number
        today: number
        suffix?: string
    }>
}

export interface TrafficData {
    labels: string[]
    datasets: Array<{
        label: string
        data: number[]
        borderColor: string
    }>
}

export interface MonthlyTraffic {
    totalVisitor: number
    totalPurchase: number
    socializing: number
}

export interface MostVisited {
    city: string
    count: number
}