import {Router} from "express"
import {getThreats, getThreatById, updateThreatStatus} from "../controllers/threats.controller"

const router: Router = Router()

router.get('/', getThreats)
router.get('/:id', getThreatById)
router.patch('/:id/status', updateThreatStatus)

export default router