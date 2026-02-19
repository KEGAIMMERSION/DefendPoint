import {Router} from "express"
import {DashboardController} from "../controllers/dashboard.controller"

const router: Router = Router()
const controller = new DashboardController()

router.get('/stats', (req, res) => controller.getStats(req, res))
router.get('/traffic', (req, res) => controller.getTrafficData(req, res))
router.get('/threats-by-type', (req, res) => controller.getThreatsByType(req, res))
router.get('/hourly-activity', (req, res) => controller.getHourlyActivity(req, res))
router.get('/top-attackers', (req, res) => controller.getTopAttackers(req, res))
router.get('/reminders', (req, res) => controller.getReminders(req, res))

export default router