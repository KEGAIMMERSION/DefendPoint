import {Request, Response} from "express"
import {SettingsService} from "../services/settings.service"
import {getQueryNumber, getQueryString} from "../utils"
import {getParamId } from "../utils"

const settingsService = new SettingsService()

export class SettingsController {
    getCurrentUser(req: Request, res: Response) {
        try {
            const user = settingsService.getCurrentUser()
            res.json(user)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateProfile(req: Request, res: Response) {
        try {
            const updatedUser = settingsService.updateProfile(req.body)
            res.json(updatedUser)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getPreferences(req: Request, res: Response) {
        try {
            const preferences = settingsService.getPreferences()
            res.json(preferences)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updatePreferences(req: Request, res: Response) {
        try {
            const updatedPreferences = settingsService.updatePreferences(req.body)
            res.json(updatedPreferences)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getNotificationSettings(req: Request, res: Response) {
        try {
            const settings = settingsService.getNotificationSettings()
            res.json(settings)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateNotificationSettings(req: Request, res: Response) {
        try {
            const updatedSettings = settingsService.updateNotificationSettings(req.body)
            res.json(updatedSettings)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getSecuritySettings(req: Request, res: Response) {
        try {
            const settings = settingsService.getSecuritySettings()
            res.json(settings)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateSecuritySettings(req: Request, res: Response) {
        try {
            const updatedSettings = settingsService.updateSecuritySettings(req.body)
            res.json(updatedSettings)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getSystemSettings(req: Request, res: Response) {
        try {
            const settings = settingsService.getSystemSettings()
            res.json(settings)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateSystemSettings(req: Request, res: Response) {
        try {
            const updatedSettings = settingsService.updateSystemSettings(req.body)
            res.json(updatedSettings)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getApiKeys(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')

            const result = settingsService.getApiKeys({ page, limit })
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getApiKeyById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid API key ID' })
            }

            const key = settingsService.getApiKeyById(id)

            if (!key) {
                return res.status(404).json({ message: 'API key not found' })
            }
            res.json(key)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    createApiKey(req: Request, res: Response) {
        try {
            const newKey = settingsService.createApiKey(req.body)
            res.status(201).json(newKey)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateApiKey(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid API key ID' })
            }

            const updatedKey = settingsService.updateApiKey(id, req.body)

            if (!updatedKey) {
                return res.status(404).json({ message: 'API key not found' })
            }
            res.json(updatedKey)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    deleteApiKey(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid API key ID' })
            }

            const deleted = settingsService.deleteApiKey(id)

            if (!deleted) {
                return res.status(404).json({ message: 'API key not found' })
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    toggleApiKey(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid API key ID' })
            }

            const key = settingsService.toggleApiKey(id)

            if (!key) {
                return res.status(404).json({ message: 'API key not found' })
            }
            res.json(key)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getAuditLogs(req: Request, res: Response) {
        try {
            const page = getQueryNumber(req, 'page')
            const limit = getQueryNumber(req, 'limit')
            const userId = getQueryString(req, 'userId')
            const action = getQueryString(req, 'action')
            const status = getQueryString(req, 'status')
            const search = getQueryString(req, 'search')

            const result = settingsService.getAuditLogs({
                page,
                limit,
                userId,
                action,
                status,
                search
            })

            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getAuditLogById(req: Request, res: Response) {
        try {
            const id = getParamId(req)

            if (!id) {
                return res.status(400).json({ message: 'Invalid log ID' })
            }

            const log = settingsService.getAuditLogById(id)

            if (!log) {
                return res.status(404).json({ message: 'Audit log not found' })
            }
            res.json(log)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    enableTwoFactor(req: Request, res: Response) {
        try {
            const { method } = req.body
            const result = settingsService.enableTwoFactor(method || 'app')
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    disableTwoFactor(req: Request, res: Response) {
        try {
            const result = settingsService.disableTwoFactor()
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    verifyTwoFactor(req: Request, res: Response) {
        try {
            const { code } = req.body
            if (!code) {
                return res.status(400).json({ message: 'Code is required' })
            }

            const result = settingsService.verifyTwoFactor(code)
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    getTrustedDevices(req: Request, res: Response) {
        try {
            const devices = settingsService.getTrustedDevices()
            res.json(devices)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    removeTrustedDevice(req: Request, res: Response) {
        try {
            const deviceId = getParamId(req)

            if (!deviceId) {
                return res.status(400).json({ message: 'Invalid device ID' })
            }

            const removed = settingsService.removeTrustedDevice(deviceId)

            if (!removed) {
                return res.status(404).json({ message: 'Device not found' })
            }
            res.status(204).send()
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    changePassword(req: Request, res: Response) {
        try {
            const { oldPassword, newPassword } = req.body

            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: 'Old password and new password are required' })
            }

            const result = settingsService.changePassword(oldPassword, newPassword)
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}