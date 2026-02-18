import {Report, ReportTemplate, ReportSchedule, ReportsSummary} from "../types"

export const reports: Report[] = [
    {
        id: '1',
        name: 'Отчет по безопасности за Март 2024',
        description: 'Детальный анализ инцидентов безопасности и угроз',
        type: 'security',
        format: 'pdf',
        status: 'completed',
        createdBy: 'admin',
        createdAt: '2024-03-01T10:00:00Z',
        generatedAt: '2024-03-01T10:05:00Z',
        completedAt: '2024-03-01T10:05:00Z',
        period: 'monthly',
        dateRange: {
            start: '2024-03-01T00:00:00Z',
            end: '2024-03-31T23:59:59Z'
        },
        filters: {
            severity: ['critical', 'high'],
            status: ['active', 'investigating']
        },
        size: 2457600,
        url: '/reports/security-march-2024.pdf',
        tags: ['security', 'monthly', 'incidents']
    },
    {
        id: '2',
        name: 'Аудит доступа за 1 квартал 2024',
        description: 'Отчет по аудиту доступа пользователей и привилегий',
        type: 'audit',
        format: 'excel',
        status: 'completed',
        createdBy: 'auditor',
        createdAt: '2024-04-01T09:00:00Z',
        generatedAt: '2024-04-01T09:15:00Z',
        completedAt: '2024-04-01T09:15:00Z',
        period: 'quarterly',
        dateRange: {
            start: '2024-01-01T00:00:00Z',
            end: '2024-03-31T23:59:59Z'
        },
        filters: {
            departments: ['IT', 'Security', 'Finance']
        },
        size: 5120000,
        url: '/reports/audit-q1-2024.xlsx',
        tags: ['audit', 'quarterly', 'access']
    },
    {
        id: '3',
        name: 'Compliance отчет: PCI DSS',
        description: 'Проверка соответствия требованиям PCI DSS',
        type: 'compliance',
        format: 'pdf',
        status: 'completed',
        createdBy: 'compliance_officer',
        createdAt: '2024-03-15T14:30:00Z',
        generatedAt: '2024-03-15T14:45:00Z',
        completedAt: '2024-03-15T14:45:00Z',
        period: 'monthly',
        dateRange: {
            start: '2024-03-01T00:00:00Z',
            end: '2024-03-31T23:59:59Z'
        },
        filters: {
            standard: 'PCI DSS v3.2.1'
        },
        size: 3891200,
        url: '/reports/pci-dss-march-2024.pdf',
        tags: ['compliance', 'pci', 'monthly']
    },
    {
        id: '4',
        name: 'Анализ производительности системы',
        description: 'Метрики производительности и загрузки ресурсов',
        type: 'performance',
        format: 'csv',
        status: 'completed',
        createdBy: 'admin',
        createdAt: '2024-03-30T08:00:00Z',
        generatedAt: '2024-03-30T08:10:00Z',
        completedAt: '2024-03-30T08:10:00Z',
        period: 'weekly',
        dateRange: {
            start: '2024-03-24T00:00:00Z',
            end: '2024-03-30T23:59:59Z'
        },
        size: 1572864,
        url: '/reports/performance-week-13.csv',
        tags: ['performance', 'weekly', 'metrics']
    },
    {
        id: '5',
        name: 'Кастомный отчет: Трафик по протоколам',
        description: 'Анализ сетевого трафика с группировкой по протоколам',
        type: 'custom',
        format: 'excel',
        status: 'generating',
        createdBy: 'analyst',
        createdAt: new Date().toISOString(),
        dateRange: {
            start: '2024-04-01T00:00:00Z',
            end: new Date().toISOString()
        },
        filters: {
            protocols: ['TCP', 'UDP', 'ICMP']
        },
        tags: ['custom', 'traffic', 'analysis']
    }
]

export const reportTemplates: ReportTemplate[] = [
    {
        id: '1',
        name: 'Шаблон: Еженедельный отчет по безопасности',
        description: 'Автоматический отчет с ключевыми метриками безопасности за неделю',
        type: 'security',
        format: 'pdf',
        isSystem: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        config: {
            sections: ['incidents', 'threats', 'vulnerabilities'],
            charts: true,
            summary: true
        }
    },
    {
        id: '2',
        name: 'Шаблон: Ежемесячный аудит доступа',
        description: 'Детальный отчет по аудиту доступа и привилегий',
        type: 'audit',
        format: 'excel',
        isSystem: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        config: {
            includeDetails: true,
            groupBy: 'department'
        }
    },
    {
        id: '3',
        name: 'Кастомный отчет по трафику',
        description: 'Пользовательский шаблон для анализа трафика',
        type: 'custom',
        format: 'csv',
        isSystem: false,
        createdAt: '2024-02-15T10:30:00Z',
        updatedAt: '2024-02-15T10:30:00Z',
        config: {
            metrics: ['bytes', 'packets', 'connections'],
            groupBy: ['protocol', 'direction']
        }
    }
]

export const reportSchedules: ReportSchedule[] = [
    {
        id: '1',
        reportId: '1',
        reportName: 'Отчет по безопасности за Март 2024',
        period: 'weekly',
        format: 'pdf',
        recipients: ['admin@example.com', 'security@example.com'],
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        lastRun: new Date(Date.now() - 604800000).toISOString(),
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '2',
        reportId: '2',
        reportName: 'Аудит доступа за 1 квартал 2024',
        period: 'monthly',
        format: 'excel',
        recipients: ['auditor@example.com'],
        nextRun: new Date(Date.now() + 259200000).toISOString(),
        lastRun: new Date(Date.now() - 2592000000).toISOString(),
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    }
]

export const reportsSummary: ReportsSummary = {
    total: reports.length,
    completed: reports.filter(r => r.status === 'completed').length,
    generating: reports.filter(r => r.status === 'generating').length,
    failed: reports.filter(r => r.status === 'failed').length,
    byType: {
        security: reports.filter(r => r.type === 'security').length,
        compliance: reports.filter(r => r.type === 'compliance').length,
        audit: reports.filter(r => r.type === 'audit').length,
        performance: reports.filter(r => r.type === 'performance').length,
        custom: reports.filter(r => r.type === 'custom').length
    },
    storageUsed: reports.reduce((acc, r) => acc + (r.size || 0), 0),
    scheduledCount: reportSchedules.length
}