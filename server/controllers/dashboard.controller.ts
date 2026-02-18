import { Request, Response } from "express"
import { DashboardService } from "../services/dashboard.service"

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
}