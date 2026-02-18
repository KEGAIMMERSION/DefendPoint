import { Request, Response } from "express"
import { ReportsService } from "../services/reports.service"
import { getQueryNumber, getQueryString, getQueryBoolean } from "../utils"
import { getParamId } from "../utils"

const reportsService = new ReportsService()

export class ReportsController {
    getReports(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')
            const type = getQueryString(req, 'type')
            const status = getQueryString(req, 'status')
            const format = getQueryString(req, 'format')
            const search = getQueryString(req, 'search')

            const result = reportsService.getReports({
                page,
                limit,
                type,
                status,
                format,
                search
            })

            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getReportById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid report ID' })
            }

            const report = reportsService.getReportById(id)

            if (!report) {
                return res.status(404).json({ message: 'Report not found' })
            }
            res.json(report)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getSummary(req: Request, res: Response) {
        try {
            const summary = reportsService.getSummary()
            res.json(summary)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    createReport(req: Request, res: Response) {
        try {
            const newReport = reportsService.createReport(req.body)
            res.status(201).json(newReport)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    cancelReport(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid report ID' })
            }

            const report = reportsService.cancelReport(id)

            if (!report) {
                return res.status(404).json({ message: 'Report not found' })
            }
            res.json(report)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    deleteReport(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid report ID' })
            }

            const deleted = reportsService.deleteReport(id)

            if (!deleted) {
                return res.status(404).json({ message: 'Report not found' })
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getTemplates(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')
            const type = getQueryString(req, 'type')
            const isSystem = getQueryBoolean(req, 'isSystem')
            const search = getQueryString(req, 'search')

            const result = reportsService.getTemplates({
                page,
                limit,
                type,
                isSystem,
                search
            })

            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getTemplateById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid template ID' })
            }

            const template = reportsService.getTemplateById(id)

            if (!template) {
                return res.status(404).json({ message: 'Template not found' })
            }
            res.json(template)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    createTemplate(req: Request, res: Response) {
        try {
            const newTemplate = reportsService.createTemplate(req.body)
            res.status(201).json(newTemplate)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateTemplate(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid template ID' })
            }

            const updatedTemplate = reportsService.updateTemplate(id, req.body)

            if (!updatedTemplate) {
                return res.status(404).json({ message: 'Template not found' })
            }
            res.json(updatedTemplate)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    deleteTemplate(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid template ID' })
            }

            const deleted = reportsService.deleteTemplate(id)

            if (!deleted) {
                return res.status(404).json({ message: 'Template not found' })
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getSchedules(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')

            const result = reportsService.getSchedules({ page, limit })

            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getScheduleById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid schedule ID' })
            }

            const schedule = reportsService.getScheduleById(id)

            if (!schedule) {
                return res.status(404).json({ message: 'Schedule not found' })
            }
            res.json(schedule)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    createSchedule(req: Request, res: Response) {
        try {
            const newSchedule = reportsService.createSchedule(req.body)
            res.status(201).json(newSchedule)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateSchedule(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid schedule ID' })
            }

            const updatedSchedule = reportsService.updateSchedule(id, req.body)

            if (!updatedSchedule) {
                return res.status(404).json({ message: 'Schedule not found' })
            }
            res.json(updatedSchedule)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    deleteSchedule(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid schedule ID' })
            }

            const deleted = reportsService.deleteSchedule(id)

            if (!deleted) {
                return res.status(404).json({ message: 'Schedule not found' })
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    toggleSchedule(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid schedule ID' })
            }

            const schedule = reportsService.toggleSchedule(id)

            if (!schedule) {
                return res.status(404).json({ message: 'Schedule not found' })
            }
            res.json(schedule)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}