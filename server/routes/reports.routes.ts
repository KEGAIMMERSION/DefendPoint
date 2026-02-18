import {Router} from "express"
import {ReportsController} from "../controllers/reports.controller"

const router: Router = Router()
const controller = new ReportsController()

router.get('/', (req, res) => controller.getReports(req, res))
router.get('/summary', (req, res) => controller.getSummary(req, res))
router.post('/', (req, res) => controller.createReport(req, res))

router.get('/templates', (req, res) => controller.getTemplates(req, res))
router.post('/templates', (req, res) => controller.createTemplate(req, res))
router.get('/templates/:id', (req, res) => controller.getTemplateById(req, res))
router.put('/templates/:id', (req, res) => controller.updateTemplate(req, res))
router.delete('/templates/:id', (req, res) => controller.deleteTemplate(req, res))

router.get('/schedules', (req, res) => controller.getSchedules(req, res))
router.post('/schedules', (req, res) => controller.createSchedule(req, res))
router.get('/schedules/:id', (req, res) => controller.getScheduleById(req, res))
router.put('/schedules/:id', (req, res) => controller.updateSchedule(req, res))
router.delete('/schedules/:id', (req, res) => controller.deleteSchedule(req, res))
router.patch('/schedules/:id/toggle', (req, res) => controller.toggleSchedule(req, res))

router.get('/:id', (req, res) => controller.getReportById(req, res))
router.post('/:id/cancel', (req, res) => controller.cancelReport(req, res))
router.delete('/:id', (req, res) => controller.deleteReport(req, res))

export default router