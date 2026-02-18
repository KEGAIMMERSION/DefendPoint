import {Router} from "express"
import {DiagnosticsController} from "../controllers/diagnostics.controller"

const router: Router = Router()
const controller = new DiagnosticsController()

router.get('/services', (req, res) => controller.getServices(req, res))
router.get('/metrics', (req, res) => controller.getSystemMetrics(req, res))
router.get('/summary', (req, res) => controller.getSummary(req, res))
router.get('/logs', (req, res) => controller.getLogs(req, res))

router.get('/services/:id', (req, res) => controller.getServiceById(req, res))
router.get('/logs/:id', (req, res) => controller.getLogById(req, res))

router.post('/services/:id/restart', (req, res) => controller.restartService(req, res))
router.post('/services/:id/stop', (req, res) => controller.stopService(req, res))
router.post('/services/:id/start', (req, res) => controller.startService(req, res))

export default router