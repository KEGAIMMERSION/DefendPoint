import {Request, Response} from "express"
import {PoliciesService} from "../services/policies.service"
import {getQueryNumber, getQueryString} from "../utils/query.utils"
import {getParamId} from "../utils/params.utils"

const policiesService = new PoliciesService()

export class PoliciesController {
    getPolicies(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')
            const type = getQueryString(req, 'type')
            const status = getQueryString(req, 'status')
            const priority = getQueryString(req, 'priority')
            const search = getQueryString(req, 'search')

            const result = policiesService.getPolicies({
                page,
                limit,
                type,
                status,
                priority,
                search
            })

            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getPolicyStats(req: Request, res: Response) {
        try {
            const stats = policiesService.getStats()
            res.json(stats)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getPolicyById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid policy ID' })
            }

            const policy = policiesService.getPolicyById(id)

            if (!policy) {
                return res.status(404).json({ message: 'Policy not found' })
            }
            res.json(policy)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    createPolicy(req: Request, res: Response) {
        try {
            const newPolicy = policiesService.createPolicy(req.body)
            res.status(201).json(newPolicy)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updatePolicy(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid policy ID' })
            }

            const updatedPolicy = policiesService.updatePolicy(id, req.body)

            if (!updatedPolicy) {
                return res.status(404).json({ message: 'Policy not found' })
            }
            res.json(updatedPolicy)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updatePolicyStatus(req: Request, res: Response) {
        try {
            const id = getParamId(req)
            const { status } = req.body

            if (!id) {
                return res.status(400).json({ message: 'Invalid policy ID' })
            }

            if (!status) {
                return res.status(400).json({ message: 'Status is required' })
            }

            const updatedPolicy = policiesService.updatePolicyStatus(id, status)

            if (!updatedPolicy) {
                return res.status(404).json({ message: 'Policy not found' })
            }
            res.json(updatedPolicy)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    deletePolicy(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid policy ID' })
            }

            const deleted = policiesService.deletePolicy(id)

            if (!deleted) {
                return res.status(404).json({ message: 'Policy not found' })
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    executePolicy(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid policy ID' })
            }

            const executedPolicy = policiesService.executePolicy(id)

            if (!executedPolicy) {
                return res.status(404).json({ message: 'Policy not found' })
            }
            res.json({
                success: true,
                message: `Политика "${executedPolicy.name}" успешно выполнена`
            })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}
