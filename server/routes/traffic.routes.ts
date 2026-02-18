import {Router} from "express"
import {TrafficController} from "../controllers/traffic.controller"

const router: Router = Router()
const controller = new TrafficController()

router.get('/', (req, res) => controller.getTraffic(req, res))
router.get('/stats', (req, res) => controller.getTrafficStats(req, res))
router.get('/bandwidth', (req, res) => controller.getBandwidthHistory(req, res))
router.get('/protocols', (req, res) => controller.getProtocolDistribution(req, res))
router.get('/:id', (req, res) => controller.getTrafficById(req, res))
router.post('/:id/block', (req, res) => controller.blockTraffic(req, res))
router.post('/:id/allow', (req, res) => controller.allowTraffic(req, res))

export default router