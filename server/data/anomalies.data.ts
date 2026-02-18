import {AnomalySeverity, AnomalyStatus, AnomalyType} from "../types"

export interface Anomaly {
    id: string
    name: string
    description: string
    type: AnomalyType
    severity: AnomalySeverity
    status: AnomalyStatus
    source: string
    timestamp: string
    value: number
    threshold: number
    unit: string
    confidence: number
    affectedAssets: string[]
    tags: string[]
    assignedTo?: string
    resolvedAt?: string
    notes?: string
}

export const anomalies: Anomaly[] = [
    {
        id: '1',
        name: 'Всплеск входящего трафика',
        description: 'Обнаружен аномальный рост входящего трафика с внешних IP',
        type: 'traffic',
        severity: 'critical',
        status: 'new',
        source: 'Gateway-01',
        timestamp: new Date(Date.now() - 1000000).toISOString(),
        value: 850,
        threshold: 500,
        unit: 'Mbps',
        confidence: 95,
        affectedAssets: ['Gateway-01', 'Firewall-02'],
        tags: ['ddos', 'traffic-spike']
    },
    {
        id: '2',
        name: 'Необычное поведение пользователя',
        description: 'Пользователь admin выполняет нехарактерные действия в нерабочее время',
        type: 'behavior',
        severity: 'high',
        status: 'investigating',
        source: 'User: admin',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        value: 15,
        threshold: 5,
        unit: 'actions/min',
        confidence: 82,
        affectedAssets: ['AD-Server'],
        tags: ['ueba', 'privileged-user'],
        assignedTo: 'security_analyst'
    },
    {
        id: '3',
        name: 'Высокая загрузка CPU',
        description: 'Критическая загрузка процессора на сервере БД',
        type: 'performance',
        severity: 'high',
        status: 'investigating',
        source: 'DB-Server-01',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        value: 98,
        threshold: 80,
        unit: '%',
        confidence: 88,
        affectedAssets: ['DB-Server-01'],
        tags: ['performance', 'cpu'],
        assignedTo: 'sysadmin'
    },
    {
        id: '4',
        name: 'Множественные неудачные попытки входа',
        description: 'Обнаружено 50+ неудачных попыток входа за 5 минут',
        type: 'security',
        severity: 'critical',
        status: 'new',
        source: 'Auth-Service',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        value: 56,
        threshold: 10,
        unit: 'attempts',
        confidence: 97,
        affectedAssets: ['Auth-Service'],
        tags: ['bruteforce', 'auth']
    },
    {
        id: '5',
        name: 'Нарушение политики доступа',
        description: 'Попытка доступа к данным PCI из неавторизованной сети',
        type: 'compliance',
        severity: 'critical',
        status: 'new',
        source: 'DLP-System',
        timestamp: new Date(Date.now() - 2700000).toISOString(),
        value: 1,
        threshold: 0,
        unit: 'event',
        confidence: 99,
        affectedAssets: ['PCI-DB'],
        tags: ['pci', 'compliance']
    }
]

export const anomalyStats = {
    total: anomalies.length,
    bySeverity: {
        critical: anomalies.filter(a => a.severity === 'critical').length,
        high: anomalies.filter(a => a.severity === 'high').length,
        medium: anomalies.filter(a => a.severity === 'medium').length,
        low: anomalies.filter(a => a.severity === 'low').length
    },
    byStatus: {
        new: anomalies.filter(a => a.status === 'new').length,
        investigating: anomalies.filter(a => a.status === 'investigating').length,
        resolved: anomalies.filter(a => a.status === 'resolved').length,
        ignored: anomalies.filter(a => a.status === 'ignored').length
    },
    byType: {
        traffic: anomalies.filter(a => a.type === 'traffic').length,
        behavior: anomalies.filter(a => a.type === 'behavior').length,
        performance: anomalies.filter(a => a.type === 'performance').length,
        security: anomalies.filter(a => a.type === 'security').length,
        compliance: anomalies.filter(a => a.type === 'compliance').length
    },
    averageConfidence: Math.round(anomalies.reduce((acc, a) => acc + a.confidence, 0) / anomalies.length),
    criticalCount: anomalies.filter(a => a.severity === 'critical').length,
    newCount: anomalies.filter(a => a.status === 'new').length,
    resolvedToday: 0
}