export type ThemeMode = 'light' | 'dark' | 'system'
export type Language = 'ru' | 'en'
export type NotificationLevel = 'all' | 'critical' | 'important' | 'none'
export type TwoFactorMethod = 'app' | 'sms' | 'email' | 'none'

export interface UserProfile {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    role: string
    department?: string
    phone?: string
    avatar?: string
    createdAt: string
    lastLogin?: string
    lastActive?: string
    isActive: boolean
    isVerified: boolean
}

export interface UserPreferences {
    userId: string
    theme: ThemeMode
    language: Language
    timezone: string
    dateFormat: string
    timeFormat: '12h' | '24h'
    firstDayOfWeek: 'monday' | 'sunday'
    itemsPerPage: number
    dashboardLayout?: Record<string, any>
    favoritePages: string[]
}

export interface NotificationSettings {
    userId: string
    email: {
        level: NotificationLevel
        criticalAlerts: boolean
        weeklyDigest: boolean
        monthlyReport: boolean
    }
    push: {
        enabled: boolean
        level: NotificationLevel
        desktop: boolean
        mobile: boolean
    }
    inApp: {
        enabled: boolean
        level: NotificationLevel
        sound: boolean
        popup: boolean
    }
}

export interface SecuritySettings {
    userId: string
    twoFactor: {
        enabled: boolean
        method: TwoFactorMethod
        verified: boolean
    }
    sessionTimeout: number
    maxSessions: number
    ipWhitelist: string[]
    loginNotifications: boolean
    passwordExpiryDays: number
    requireMFAForSensitive: boolean
    trustedDevices: Array<{
        id: string
        name: string
        lastUsed: string
        ip: string
    }>
}

export interface ApiKey {
    id: string
    userId: string
    name: string
    key: string
    permissions: string[]
    createdAt: string
    lastUsed?: string
    expiresAt?: string
    isActive: boolean
}