import {Router} from "express"
import {DashboardController} from "../controllers/dashboard.controller"

const router: Router = Router()
const controller = new DashboardController()

router.get('/stats', (req, res) => controller.getStats(req, res))
router.get('/traffic', (req, res) => controller.getTrafficData(req, res))

export default router