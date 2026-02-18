import {Request, Response} from "express"
import {ThreatsService} from "../services/threats.service"
import {getQueryNumber, getQueryString} from "../utils/query.utils"
import {getParamId} from "../utils/params.utils"

const threatsService = new ThreatsService()

export const getThreats = (req: Request, res: Response) => {
    try {
        const page = getQueryNumber(req, 'page')
        const limit = getQueryNumber(req, 'limit')
        const severity = getQueryString(req, 'severity')
        const search = getQueryString(req, 'search')

        const result = threatsService.getThreats({ page, limit, severity, search })
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getThreatById = (req: Request, res: Response) => {
    try {
        const id = getParamId(req)

        if (!id) {
            return res.status(400).json({ message: 'Invalid threat ID' })
        }

        const threat = threatsService.getThreatById(id)

        if (!threat) {
            return res.status(404).json({ message: 'Threat not found' })
        }
        res.json(threat)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const updateThreatStatus = (req: Request, res: Response) => {
    try {
        const id = getParamId(req)
        const { status } = req.body

        if (!id) {
            return res.status(400).json({ message: 'Invalid threat ID' })
        }

        if (!status) {
            return res.status(400).json({ message: 'Status is required' })
        }

        const threat = threatsService.updateThreatStatus(id, status)

        if (!threat) {
            return res.status(404).json({ message: 'Threat not found' })
        }
        res.json(threat)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}