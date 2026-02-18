import { AuthEventType, AuthStatus, AuthMethod } from "../types"

export interface AuthLog {
    id: string
    timestamp: string
    eventType: AuthEventType
    status: AuthStatus
    username: string
    userRole: string
    ipAddress: string
    location?: string
    device?: string
    browser?: string
    os?: string
    authMethod: AuthMethod
    duration?: number
    failureReason?: string
}

export const authLogs: AuthLog[] = [
    {
        id: '1',
        timestamp: new Date(Date.now() - 1000000).toISOString(),
        eventType: 'login',
        status: 'success',
        username: 'admin',
        userRole: 'Administrator',
        ipAddress: '192.168.1.100',
        location: 'Москва, Россия',
        device: 'MacBook Pro',
        browser: 'Chrome 120',
        os: 'macOS 14',
        authMethod: 'password',
        duration: 3600
    },
    {
        id: '2',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        eventType: 'failed_login',
        status: 'failure',
        username: 'user1',
        userRole: 'User',
        ipAddress: '45.67.89.123',
        location: 'Санкт-Петербург, Россия',
        device: 'Windows PC',
        browser: 'Firefox 121',
        os: 'Windows 11',
        authMethod: 'password',
        failureReason: 'Неверный пароль'
    },
    {
        id: '3',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        eventType: 'mfa',
        status: 'success',
        username: 'security_analyst',
        userRole: 'Security Analyst',
        ipAddress: '10.0.0.45',
        location: 'Новосибирск, Россия',
        device: 'iPhone 15',
        browser: 'Safari',
        os: 'iOS 17',
        authMethod: 'mfa'
    },
    {
        id: '4',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        eventType: 'logout',
        status: 'success',
        username: 'admin',
        userRole: 'Administrator',
        ipAddress: '192.168.1.100',
        location: 'Москва, Россия',
        device: 'MacBook Pro',
        browser: 'Chrome 120',
        os: 'macOS 14',
        authMethod: 'password',
        duration: 7200
    },
    {
        id: '5',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        eventType: 'failed_login',
        status: 'blocked',
        username: 'unknown',
        userRole: 'Unknown',
        ipAddress: '89.123.45.67',
        location: 'Китай',
        device: 'Unknown',
        browser: 'Unknown',
        os: 'Unknown',
        authMethod: 'password',
        failureReason: 'Блокировка по IP'
    }
]

export const authStats = {
    totalLogins: 15420,
    successfulLogins: 14890,
    failedLogins: 450,
    blockedAttempts: 80,
    uniqueUsers: 342,
    mfaUsage: 78,
    averageSessionDuration: 5400,
    loginsByHour: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        count: Math.floor(Math.random() * 100) + 20
    })),
    topLocations: [
        { location: 'Москва', count: 4520 },
        { location: 'СПб', count: 2340 },
        { location: 'Новосибирск', count: 890 },
        { location: 'Екатеринбург', count: 670 },
        { location: 'Казань', count: 450 }
    ],
    recentActivity: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 86400000).toLocaleDateString('ru-RU'),
        success: Math.floor(Math.random() * 200) + 100,
        failure: Math.floor(Math.random() * 20) + 5
    }))
}