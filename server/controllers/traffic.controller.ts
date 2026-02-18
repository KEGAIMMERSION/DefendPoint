import {Request, Response} from "express"
import {TrafficService} from "../services/traffic.service"
import {getQueryNumber, getQueryString} from "../utils/query.utils"
import {getParamId} from "../utils/params.utils"

const trafficService = new TrafficService()

export class TrafficController {
    getTraffic(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')
            const protocol = getQueryString(req, 'protocol')
            const direction = getQueryString(req, 'direction')
            const status = getQueryString(req, 'status')
            const search = getQueryString(req, 'search')

            const result = trafficService.getTraffic({
                page,
                limit,
                protocol,
                direction,
                status,
                search
            })

            res.json({
                ...result,
                stats: trafficService.getStats()
            })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getTrafficStats(req: Request, res: Response) {
        try {
            const stats = trafficService.getStats()
            res.json(stats)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getBandwidthHistory(req: Request, res: Response) {
        try {
            const interval = getQueryString(req, 'interval') || 'day'
            const data = trafficService.getBandwidthHistory(interval)
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getProtocolDistribution(req: Request, res: Response) {
        try {
            const data = trafficService.getProtocolDistribution()
            res.json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getTrafficById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid traffic flow ID' })
            }

            const flow = trafficService.getTrafficById(id)

            if (!flow) {
                return res.status(404).json({ message: 'Traffic flow not found' })
            }
            res.json(flow)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    blockTraffic(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid traffic flow ID' })
            }

            const result = trafficService.blockTraffic(id)

            if (!result) {
                return res.status(404).json({ message: 'Traffic flow not found' })
            }
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    allowTraffic(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid traffic flow ID' })
            }

            const result = trafficService.allowTraffic(id)

            if (!result) {
                return res.status(404).json({ message: 'Traffic flow not found' })
            }
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}