import {
    currentUser,
    userPreferences,
    notificationSettings,
    securitySettings,
    systemSettings,
    apiKeys,
    auditLogs
} from "../data"
import {PaginationQuery} from "../types"
import {applyPagination} from "../utils"

interface AuditLogsQuery extends PaginationQuery {
    userId?: string
    action?: string
    status?: string
    search?: string
}

export class SettingsService {
    getCurrentUser() {
        return currentUser
    }

    updateProfile(data: Partial<typeof currentUser>) {
        Object.assign(currentUser, data)
        return currentUser
    }

    getPreferences() {
        return userPreferences
    }

    updatePreferences(data: Partial<typeof userPreferences>) {
        Object.assign(userPreferences, data)
        return userPreferences
    }

    getNotificationSettings() {
        return notificationSettings
    }

    updateNotificationSettings(data: Partial<typeof notificationSettings>) {
        Object.assign(notificationSettings, data)
        return notificationSettings
    }

    getSecuritySettings() {
        return securitySettings
    }

    updateSecuritySettings(data: Partial<typeof securitySettings>) {
        Object.assign(securitySettings, data)
        return securitySettings
    }

    getSystemSettings() {
        return systemSettings
    }

    updateSystemSettings(data: Partial<typeof systemSettings>) {
        Object.assign(systemSettings, data)
        return systemSettings
    }

    getApiKeys(query: PaginationQuery) {
        return applyPagination(apiKeys, query)
    }

    getApiKeyById(id: string) {
        return apiKeys.find(key => key.id === id)
    }

    createApiKey(data: any) {
        const newKey = {
            id: `key_${apiKeys.length + 1}`,
            userId: 'user_1',
            key: `dp_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
            createdAt: new Date().toISOString(),
            isActive: true,
            ...data
        }
        apiKeys.push(newKey)
        return newKey
    }

    updateApiKey(id: string, data: any) {
        const index = apiKeys.findIndex(key => key.id === id)
        if (index === -1) return null

        apiKeys[index] = { ...apiKeys[index], ...data }
        return apiKeys[index]
    }

    deleteApiKey(id: string) {
        const index = apiKeys.findIndex(key => key.id === id)
        if (index === -1) return false

        apiKeys.splice(index, 1)
        return true
    }

    toggleApiKey(id: string) {
        const key = apiKeys.find(k => k.id === id)
        if (!key) return null

        key.isActive = !key.isActive
        return key
    }

    getAuditLogs(query: AuditLogsQuery) {
        let filtered = [...auditLogs]

        if (query.userId) {
            filtered = filtered.filter(log => log.userId === query.userId)
        }

        if (query.action) {
            filtered = filtered.filter(log => log.action === query.action)
        }

        if (query.status) {
            filtered = filtered.filter(log => log.status === query.status)
        }

        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(log =>
                log.username.toLowerCase().includes(searchLower) ||
                log.action.toLowerCase().includes(searchLower) ||
                log.resource.toLowerCase().includes(searchLower)
            )
        }

        return applyPagination(filtered, query)
    }

    getAuditLogById(id: string) {
        return auditLogs.find(log => log.id === id)
    }

    enableTwoFactor(method: string) {
        securitySettings.twoFactor.enabled = true
        securitySettings.twoFactor.method = method as any
        return { success: true, message: '2FA включена' }
    }

    disableTwoFactor() {
        securitySettings.twoFactor.enabled = false
        return { success: true, message: '2FA отключена' }
    }

    verifyTwoFactor(code: string) {
        if (code === '123456') {
            securitySettings.twoFactor.verified = true
            return { success: true, message: '2FA подтверждена' }
        }
        return { success: false, message: 'Неверный код' }
    }

    getTrustedDevices() {
        return securitySettings.trustedDevices
    }

    removeTrustedDevice(deviceId: string) {
        const index = securitySettings.trustedDevices.findIndex(d => d.id === deviceId)
        if (index === -1) return false

        securitySettings.trustedDevices.splice(index, 1)
        return true
    }

    changePassword(oldPassword: string, newPassword: string) {
        // Симуляция смены пароля
        if (oldPassword === 'oldpassword') {
            return { success: true, message: 'Пароль изменен' }
        }
        return { success: false, message: 'Неверный старый пароль' }
    }
}