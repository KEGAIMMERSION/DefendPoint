export const policies = [
    {
        id: '1',
        name: 'Запрет входящего трафика на 22 порт',
        description: 'Блокировка всех входящих SSH соединений из внешних сетей',
        type: 'firewall',
        status: 'active',
        priority: 'high',
        rules: 5,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-02-20T14:25:00Z',
        createdBy: 'admin',
        version: 2,
        tags: ['ssh', 'inbound', 'security'],
        lastExecuted: '2024-03-01T08:00:00Z',
        successRate: 99.8
    },
    {
        id: '2',
        name: 'Обнаружение SQL-инъекций',
        description: 'Правила для IDS по обнаружению попыток SQL-инъекций',
        type: 'ids',
        status: 'active',
        priority: 'critical',
        rules: 12,
        createdAt: '2024-01-20T09:15:00Z',
        updatedAt: '2024-02-25T11:30:00Z',
        createdBy: 'security_analyst',
        version: 3,
        tags: ['sql', 'injection', 'web'],
        lastExecuted: '2024-03-01T08:00:00Z',
        successRate: 97.5
    },
    {
        id: '3',
        name: 'Блокировка DDoS-атак',
        description: 'Правила для IPS по обнаружению и блокировке DDoS-атак',
        type: 'ips',
        status: 'active',
        priority: 'critical',
        rules: 8,
        createdAt: '2024-01-25T14:20:00Z',
        updatedAt: '2024-02-28T16:45:00Z',
        createdBy: 'network_admin',
        version: 2,
        tags: ['ddos', 'network', 'blocking'],
        lastExecuted: '2024-03-01T08:00:00Z',
        successRate: 95.2
    }
]

export const policyStats = {
    total: policies.length,
    active: policies.filter(p => p.status === 'active').length,
    inactive: policies.filter(p => p.status === 'inactive').length,
    draft: policies.filter(p => p.status === 'draft').length,
    archived: policies.filter(p => p.status === 'archived').length,
    byType: {
        firewall: policies.filter(p => p.type === 'firewall').length,
        ids: policies.filter(p => p.type === 'ids').length,
        ips: policies.filter(p => p.type === 'ips').length,
        access: policies.filter(p => p.type === 'access').length,
        encryption: policies.filter(p => p.type === 'encryption').length,
        audit: policies.filter(p => p.type === 'audit').length
    },
    byPriority: {
        critical: policies.filter(p => p.priority === 'critical').length,
        high: policies.filter(p => p.priority === 'high').length,
        medium: policies.filter(p => p.priority === 'medium').length,
        low: policies.filter(p => p.priority === 'low').length
    }
}