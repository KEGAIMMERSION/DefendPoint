import {
    UserProfile,
    UserPreferences,
    NotificationSettings,
    SecuritySettings,
    SystemSettings,
    ApiKey,
    AuditLogEntry
} from "../types"

export const currentUser: UserProfile = {
    id: 'user_1',
    username: 'admin',
    email: 'admin@defendpoint.local',
    firstName: 'Admin',
    lastName: 'User',
    role: 'Administrator',
    department: 'IT Security',
    phone: '+7 (999) 123-45-67',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    isActive: true,
    isVerified: true
}

export const userPreferences: UserPreferences = {
    userId: 'user_1',
    theme: 'dark',
    language: 'ru',
    timezone: 'Europe/Moscow',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: '24h',
    firstDayOfWeek: 'monday',
    itemsPerPage: 20,
    dashboardLayout: {
        widgets: ['stats', 'threats', 'traffic', 'anomalies']
    },
    favoritePages: ['/dashboard', '/threats', '/anomalies'],
    shortcuts: [
        { key: 'ctrl+n', action: 'new-report', description: 'Создать отчет' },
        { key: 'ctrl+f', action: 'search', description: 'Поиск' },
        { key: 'ctrl+k', action: 'command-palette', description: 'Командная палитра' }
    ]
}

export const notificationSettings: NotificationSettings = {
    userId: 'user_1',
    email: {
        level: 'important',
        criticalAlerts: true,
        weeklyDigest: true,
        monthlyReport: true
    },
    push: {
        enabled: true,
        level: 'critical',
        desktop: true,
        mobile: true
    },
    inApp: {
        enabled: true,
        level: 'all',
        sound: true,
        popup: true
    },
    digest: {
        enabled: true,
        frequency: 'daily',
        time: '09:00'
    }
}

export const securitySettings: SecuritySettings = {
    userId: 'user_1',
    twoFactor: {
        enabled: true,
        method: 'app',
        verified: true
    },
    sessionTimeout: 60,
    maxSessions: 3,
    ipWhitelist: ['192.168.1.*', '10.0.0.*'],
    loginNotifications: true,
    passwordExpiryDays: 90,
    requireMFAForSensitive: true,
    trustedDevices: [
        {
            id: 'dev_1',
            name: 'MacBook Pro',
            lastUsed: new Date().toISOString(),
            ip: '192.168.1.100'
        },
        {
            id: 'dev_2',
            name: 'iPhone 15',
            lastUsed: new Date(Date.now() - 86400000).toISOString(),
            ip: '192.168.1.101'
        }
    ]
}

export const systemSettings: SystemSettings = {
    general: {
        siteName: 'DefendPoint NDR',
        siteUrl: 'https://defendpoint.local',
        supportEmail: 'support@defendpoint.local',
        maintenanceMode: false,
        maintenanceMessage: '',
        defaultLanguage: 'ru',
        registrationEnabled: true
    },
    security: {
        passwordMinLength: 8,
        passwordRequireNumbers: true,
        passwordRequireSymbols: true,
        maxLoginAttempts: 5,
        lockoutDuration: 30,
        sessionTimeout: 60,
        mfaRequired: false,
        mfaEnforcedRoles: ['Administrator']
    },
    notifications: {
        emailFrom: 'noreply@defendpoint.local',
        smtpServer: 'smtp.gmail.com',
        smtpPort: 587,
        smtpSecure: true,
        pushEnabled: true
    },
    logging: {
        logLevel: 'info',
        retentionDays: 30,
        auditLogEnabled: true
    },
    integrations: [
        {
            id: 'int_1',
            name: 'Slack',
            type: 'messaging',
            enabled: true,
            config: { webhook: 'https://hooks.slack.com/services/xxx' }
        },
        {
            id: 'int_2',
            name: 'Jira',
            type: 'ticketing',
            enabled: false,
            config: { url: 'https://jira.example.com', project: 'SEC' }
        }
    ]
}

export const apiKeys: ApiKey[] = [
    {
        id: 'key_1',
        userId: 'user_1',
        name: 'Production API Key',
        key: 'dp_live_xxxxx12345',
        permissions: ['read:threats', 'read:anomalies'],
        createdAt: '2024-01-15T10:00:00Z',
        lastUsed: new Date(Date.now() - 3600000).toISOString(),
        expiresAt: '2025-01-15T10:00:00Z',
        isActive: true
    },
    {
        id: 'key_2',
        userId: 'user_1',
        name: 'Development API Key',
        key: 'dp_test_yyyyy67890',
        permissions: ['read:threats', 'write:incidents'],
        createdAt: '2024-02-01T14:30:00Z',
        lastUsed: new Date(Date.now() - 86400000).toISOString(),
        isActive: true
    }
]

export const auditLogs: AuditLogEntry[] = [
    {
        id: 'audit_1',
        userId: 'user_1',
        username: 'admin',
        action: 'login',
        resource: 'session',
        details: { method: 'password' },
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'success'
    },
    {
        id: 'audit_2',
        userId: 'user_1',
        username: 'admin',
        action: 'update',
        resource: 'user_preferences',
        details: { field: 'theme', old: 'light', new: 'dark' },
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'success'
    },
    {
        id: 'audit_3',
        userId: 'user_1',
        username: 'admin',
        action: 'create',
        resource: 'api_key',
        details: { name: 'Development API Key' },
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        status: 'success'
    }
]