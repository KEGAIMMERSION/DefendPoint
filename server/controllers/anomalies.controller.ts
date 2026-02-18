import {Request, Response} from "express"
import {AnomaliesService} from "../services/anomalies.service"
import {getQueryNumber, getQueryString} from "../utils"
import {getParamId} from "../utils"

const anomaliesService = new AnomaliesService()

export class AnomaliesController {
    getAnomalies(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')
            const type = getQueryString(req, 'type')
            const severity = getQueryString(req, 'severity')
            const status = getQueryString(req, 'status')
            const search = getQueryString(req, 'search')

            const result = anomaliesService.getAnomalies({
                page,
                limit,
                type,
                severity,
                status,
                search
            })

            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getStats(req: Request, res: Response) {
        try {
            const stats = anomaliesService.getStats()
            res.json(stats)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getTimeline(req: Request, res: Response) {
        try {
            const period = getQueryString(req, 'period') || 'day'
            const data = anomaliesService.getTimelineData(period)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getAnomalyById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid anomaly ID' })
            }

            const anomaly = anomaliesService.getAnomalyById(id)

            if (!anomaly) {
                return res.status(404).json({ message: 'Anomaly not found' })
            }
            res.json(anomaly)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateAnomalyStatus(req: Request, res: Response) {
        try {
            const id = getParamId(req)
            const { status, notes } = req.body

            if (!id) {
                return res.status(400).json({ message: 'Invalid anomaly ID' })
            }

            if (!status) {
                return res.status(400).json({ message: 'Status is required' })
            }

            const anomaly = anomaliesService.updateAnomalyStatus(id, status, notes)

            if (!anomaly) {
                return res.status(404).json({ message: 'Anomaly not found' })
            }
            res.json(anomaly)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    assignAnomaly(req: Request, res: Response) {
        try {
            const id = getParamId(req)
            const { assignedTo } = req.body

            if (!id) {
                return res.status(400).json({ message: 'Invalid anomaly ID' })
            }

            if (!assignedTo) {
                return res.status(400).json({ message: 'assignedTo is required' })
            }

            const anomaly = anomaliesService.assignAnomaly(id, assignedTo)

            if (!anomaly) {
                return res.status(404).json({ message: 'Anomaly not found' })
            }
            res.json(anomaly)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    resolveAnomaly(req: Request, res: Response) {
        try {
            const id = getParamId(req)
            const { notes } = req.body

            if (!id) {
                return res.status(400).json({ message: 'Invalid anomaly ID' })
            }

            const anomaly = anomaliesService.resolveAnomaly(id, notes)

            if (!anomaly) {
                return res.status(404).json({ message: 'Anomaly not found' })
            }
            res.json(anomaly)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}