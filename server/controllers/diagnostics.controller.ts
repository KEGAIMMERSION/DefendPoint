import {Request, Response} from "express"
import {DiagnosticsService} from "../services/diagnostics.service"
import {getQueryNumber, getQueryString} from "../utils"
import {getParamId} from "../utils"

const diagnosticsService = new DiagnosticsService()

export class DiagnosticsController {
    getServices(req: Request, res: Response) {
        try {
            const services = diagnosticsService.getServices()
            res.json(services)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getSystemMetrics(req: Request, res: Response) {
        try {
            const metrics = diagnosticsService.getSystemMetrics()
            res.json(metrics)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getSummary(req: Request, res: Response) {
        try {
            const summary = diagnosticsService.getSummary()
            res.json(summary)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getLogs(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')
            const level = getQueryString(req, 'level')
            const component = getQueryString(req, 'component')
            const search = getQueryString(req, 'search')

            const result = diagnosticsService.getLogs({
                page,
                limit,
                level,
                component,
                search
            })

            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getServiceById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid service ID' })
            }

            const service = diagnosticsService.getServiceById(id)

            if (!service) {
                return res.status(404).json({ message: 'Service not found' })
            }
            res.json(service)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getLogById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid log ID' })
            }

            const log = diagnosticsService.getLogById(id)

            if (!log) {
                return res.status(404).json({ message: 'Log not found' })
            }
            res.json(log)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    restartService(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid service ID' })
            }

            const result = diagnosticsService.restartService(id)

            if (!result) {
                return res.status(404).json({ message: 'Service not found' })
            }
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    stopService(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid service ID' })
            }

            const result = diagnosticsService.stopService(id)

            if (!result) {
                return res.status(404).json({ message: 'Service not found' })
            }
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    startService(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid service ID' })
            }

            const result = diagnosticsService.startService(id)

            if (!result) {
                return res.status(404).json({ message: 'Service not found' })
            }
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}