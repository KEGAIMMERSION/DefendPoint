import {Router} from "express"
import {SettingsController} from "../controllers/settings.controller"

const router: Router = Router()
const controller = new SettingsController()

router.get('/profile', (req, res) => controller.getCurrentUser(req, res))
router.put('/profile', (req, res) => controller.updateProfile(req, res))

router.get('/preferences', (req, res) => controller.getPreferences(req, res))
router.put('/preferences', (req, res) => controller.updatePreferences(req, res))

router.get('/notifications', (req, res) => controller.getNotificationSettings(req, res))
router.put('/notifications', (req, res) => controller.updateNotificationSettings(req, res))

router.get('/security', (req, res) => controller.getSecuritySettings(req, res))
router.put('/security', (req, res) => controller.updateSecuritySettings(req, res))

router.get('/system', (req, res) => controller.getSystemSettings(req, res))
router.put('/system', (req, res) => controller.updateSystemSettings(req, res))

router.get('/api-keys', (req, res) => controller.getApiKeys(req, res))
router.post('/api-keys', (req, res) => controller.createApiKey(req, res))
router.get('/api-keys/:id', (req, res) => controller.getApiKeyById(req, res))
router.put('/api-keys/:id', (req, res) => controller.updateApiKey(req, res))
router.delete('/api-keys/:id', (req, res) => controller.deleteApiKey(req, res))
router.patch('/api-keys/:id/toggle', (req, res) => controller.toggleApiKey(req, res))

router.get('/audit-logs', (req, res) => controller.getAuditLogs(req, res))
router.get('/audit-logs/:id', (req, res) => controller.getAuditLogById(req, res))

router.post('/2fa/enable', (req, res) => controller.enableTwoFactor(req, res))
router.post('/2fa/disable', (req, res) => controller.disableTwoFactor(req, res))
router.post('/2fa/verify', (req, res) => controller.verifyTwoFactor(req, res))

router.get('/trusted-devices', (req, res) => controller.getTrustedDevices(req, res))
router.delete('/trusted-devices/:id', (req, res) => controller.removeTrustedDevice(req, res))

router.post('/change-password', (req, res) => controller.changePassword(req, res))

export default router