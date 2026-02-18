import {Request, Response} from "express"
import {AuthLogsService} from "../services/auth-logs.service"
import {getQueryNumber, getQueryString} from "../utils"
import {getParamId} from "../utils"

const authLogsService = new AuthLogsService()

export class AuthLogsController {
    getAuthLogs(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')
            const eventType = getQueryString(req, 'eventType')
            const status = getQueryString(req, 'status')
            const username = getQueryString(req, 'username')
            const search = getQueryString(req, 'search')

            const result = authLogsService.getAuthLogs({
                page,
                limit,
                eventType,
                status,
                username,
                search
            })

            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getStats(req: Request, res: Response) {
        try {
            const period = getQueryString(req, 'period') || 'day'
            const stats = authLogsService.getStats()
            res.json(stats)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getAuthLogById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid log ID' })
            }

            const log = authLogsService.getAuthLogById(id)

            if (!log) {
                return res.status(404).json({ message: 'Log not found' })
            }
            res.json(log)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}