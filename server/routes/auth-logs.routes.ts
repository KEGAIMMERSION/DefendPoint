import {Router} from "express"
import {AuthLogsController} from "../controllers/auth-logs.controller"

const router: Router = Router()
const controller = new AuthLogsController()

router.get('/', (req, res) => controller.getAuthLogs(req, res))
router.get('/stats', (req, res) => controller.getStats(req, res))
router.get('/:id', (req, res) => controller.getAuthLogById(req, res))

export default router