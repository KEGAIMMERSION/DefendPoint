import {dashboardStats, trafficData, dashboardCharts} from "../data"

export class DashboardService {
    getStats() {
        return dashboardStats
    }

    getTrafficData() {
        return trafficData
    }

    getThreatsByType() {
        return dashboardCharts.threatsByType
    }

    getHourlyActivity() {
        return dashboardCharts.hourlyActivity
    }

    getTopAttackers() {
        return dashboardCharts.topAttackers
    }

    getReminders() {
        return dashboardCharts.reminders
    }
}