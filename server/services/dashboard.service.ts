import {dashboardStats, trafficData} from "../data"

export class DashboardService {
    getStats() {
        return dashboardStats
    }

    getTrafficData() {
        return trafficData
    }
}