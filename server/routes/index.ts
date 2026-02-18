import {Router} from "express"
import dashboardRoutes from "./dashboard.routes"
import threatsRoutes from "./threats.routes"
import policiesRoutes from "./policies.routes"
import trafficRoutes from "./traffic.routes"
import anomaliesRoutes from "./anomalies.routes"
import authLogsRoutes from "./auth-logs.routes"
import diagnosticsRoutes from "./diagnostics.routes"
import reportsRoutes from "./reports.routes"
import settingsRoutes from "./settings.routes"

const router: Router = Router()

router.use('/dashboard', dashboardRoutes)
router.use('/threats', threatsRoutes)
router.use('/policies', policiesRoutes)
router.use('/traffic', trafficRoutes)
router.use('/anomalies', anomaliesRoutes)
router.use('/auth-logs', authLogsRoutes)
router.use('/diagnostics', diagnosticsRoutes)
router.use('/reports', reportsRoutes)
router.use('/settings', settingsRoutes)

export default router