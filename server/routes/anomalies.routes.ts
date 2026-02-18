import {Router} from "express"
import {AnomaliesController} from "../controllers/anomalies.controller"

const router: Router = Router()
const controller = new AnomaliesController()

router.get('/', (req, res) => controller.getAnomalies(req, res))
router.get('/stats', (req, res) => controller.getStats(req, res))
router.get('/timeline', (req, res) => controller.getTimeline(req, res))
router.get('/:id', (req, res) => controller.getAnomalyById(req, res))
router.patch('/:id/status', (req, res) => controller.updateAnomalyStatus(req, res))
router.post('/:id/assign', (req, res) => controller.assignAnomaly(req, res))
router.post('/:id/resolve', (req, res) => controller.resolveAnomaly(req, res))

export default router