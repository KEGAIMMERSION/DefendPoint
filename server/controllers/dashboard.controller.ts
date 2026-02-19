import {Request, Response} from "express"
import {DashboardService} from "../services/dashboard.service"

const dashboardService = new DashboardService()

export class DashboardController {
    getStats(req: Request, res: Response) {
        try {
            const stats = dashboardService.getStats()
            res.json(stats)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getTrafficData(req: Request, res: Response) {
        try {
            const data = dashboardService.getTrafficData()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getThreatsByType(req: Request, res: Response) {
        try {
            const data = dashboardService.getThreatsByType()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getHourlyActivity(req: Request, res: Response) {
        try {
            const data = dashboardService.getHourlyActivity()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getTopAttackers(req: Request, res: Response) {
        try {
            const data = dashboardService.getTopAttackers()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getReminders(req: Request, res: Response) {
        try {
            const data = dashboardService.getReminders()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}