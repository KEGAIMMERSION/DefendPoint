import {Router} from "express"
import {PoliciesController} from "../controllers/policies.controller"

const router: Router = Router()
const controller = new PoliciesController()

router.get('/', (req, res) => controller.getPolicies(req, res))
router.get('/stats', (req, res) => controller.getPolicyStats(req, res))
router.get('/:id', (req, res) => controller.getPolicyById(req, res))
router.post('/', (req, res) => controller.createPolicy(req, res))
router.put('/:id', (req, res) => controller.updatePolicy(req, res))
router.patch('/:id/status', (req, res) => controller.updatePolicyStatus(req, res))
router.delete('/:id', (req, res) => controller.deletePolicy(req, res))
router.post('/:id/execute', (req, res) => controller.executePolicy(req, res))

export default router