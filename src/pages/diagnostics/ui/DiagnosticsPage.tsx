import React, {useState} from "react"
import {
    useGetServicesQuery,
    useGetSystemMetricsQuery,
    useGetSummaryQuery,
    useGetLogsQuery,
    useRestartServiceMutation,
    useStopServiceMutation,
    useStartServiceMutation
} from "@entities/diagnostics/api/diagnosticsApi"
import styles from "./DiagnosticsPage.module.scss"

export const DiagnosticsPage: React.FC = () => {
    const [logsPage, setLogsPage] = useState(1)
    const [logLevel, setLogLevel] = useState('')
    const [logSearch, setLogSearch] = useState('')

    const { data: services, isLoading: servicesLoading } = useGetServicesQuery()
    const { data: metrics, isLoading: metricsLoading } = useGetSystemMetricsQuery()
    const { data: summary, isLoading: summaryLoading } = useGetSummaryQuery()
    const { data: logs } = useGetLogsQuery({
        page: logsPage,
        limit: 20,
        level: logLevel || undefined,
        search: logSearch || undefined
    })

    const [restartService] = useRestartServiceMutation()
    const [stopService] = useStopServiceMutation()
    const [startService] = useStartServiceMutation()

    const formatBytes = (bytes: number): string => {
        const units = ['B', 'KB', 'MB', 'GB', 'TB']
        let size = bytes
        let unitIndex = 0
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024
            unitIndex++
        }
        return `${size.toFixed(1)} ${units[unitIndex]}`
    }

    const formatUptime = (seconds: number): string => {
        const days = Math.floor(seconds / 86400)
        const hours = Math.floor((seconds % 86400) / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)

        if (days > 0) return `${days}д ${hours}ч`
        if (hours > 0) return `${hours}ч ${minutes}м`
        return `${minutes}м`
    }

    const handleRestart = async (id: string) => {
        if (confirm('Перезапустить сервис?')) {
            await restartService(id)
        }
    }

    const handleStop = async (id: string) => {
        if (confirm('Остановить сервис?')) {
            await stopService(id)
        }
    }

    const handleStart = async (id: string) => {
        await startService(id)
    }

    if (servicesLoading || metricsLoading || summaryLoading) {
        return <div className={styles.loading}>Загрузка диагностики...</div>
    }

    return (
        <div className={styles.diagnosticsPage}>
            <h1 className={styles.pageTitle}>Диагностика системы</h1>
            <p className={styles.pageSubtitle}>
                Мониторинг состояния сервисов и производительности
            </p>

            <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Общее состояние</div>
                    <div className={styles.summaryValue}>
                        {summary?.overall === 'healthy' ? 'Здорова' :
                            summary?.overall === 'degraded' ? 'Деградация' :
                                summary?.overall === 'down' ? 'Неработоспособна' : 'Обслуживание'}
                    </div>
                    <div className={styles.summaryDetail}>
                        <span className={styles.healthy}>✓ {summary?.healthyServices}</span>
                        <span className={styles.degraded}>⚠ {summary?.degradedServices}</span>
                        <span className={styles.down}>✗ {summary?.downServices}</span>
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Время отклика</div>
                    <div className={styles.summaryValue}>
                        {summary?.avgResponseTime}ms
                    </div>
                    <div className={styles.summaryDetail}>
                        среднее по всем сервисам
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Критические алерты</div>
                    <div className={styles.summaryValue}>
                        {summary?.criticalAlerts}
                    </div>
                    <div className={styles.summaryDetail}>
                        требуют внимания
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Предупреждения</div>
                    <div className={styles.summaryValue}>
                        {summary?.warnings}
                    </div>
                    <div className={styles.summaryDetail}>
                        {summary?.totalServices} всего сервисов
                    </div>
                </div>
            </div>

            {metrics && (
                <div className={styles.metricsSection}>
                    <div className={styles.metricCard}>
                        <h3>CPU</h3>
                        <div className={styles.metricBar}>
                            <div className={styles.metricHeader}>
                                <span className={styles.metricName}>Загрузка</span>
                                <span className={styles.metricValue}>{metrics.cpu.usage}%</span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={`${styles.progressFill} ${styles.cpu}`}
                                    style={{ width: `${metrics.cpu.usage}%` }}
                                />
                            </div>
                        </div>
                        <div className={styles.metricDetails}>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Ядра</div>
                                <div className={styles.detailValue}>{metrics.cpu.cores}</div>
                            </div>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Load Avg</div>
                                <div className={styles.detailValue}>
                                    {metrics.cpu.loadAverage[0].toFixed(1)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <h3>Память</h3>
                        <div className={styles.metricBar}>
                            <div className={styles.metricHeader}>
                                <span className={styles.metricName}>Использовано</span>
                                <span className={styles.metricValue}>
                                    {formatBytes(metrics.memory.used)} / {formatBytes(metrics.memory.total)}
                                </span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={`${styles.progressFill} ${styles.memory}`}
                                    style={{ width: `${metrics.memory.usagePercent}%` }}
                                />
                            </div>
                        </div>
                        <div className={styles.metricDetails}>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Свободно</div>
                                <div className={styles.detailValue}>{formatBytes(metrics.memory.free)}</div>
                            </div>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Кэш</div>
                                <div className={styles.detailValue}>{formatBytes(metrics.memory.cached)}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <h3>Диск</h3>
                        <div className={styles.metricBar}>
                            <div className={styles.metricHeader}>
                                <span className={styles.metricName}>Использовано</span>
                                <span className={styles.metricValue}>
                                    {formatBytes(metrics.disk.used)} / {formatBytes(metrics.disk.total)}
                                </span>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={`${styles.progressFill} ${styles.disk}`}
                                    style={{ width: `${metrics.disk.usagePercent}%` }}
                                />
                            </div>
                        </div>
                        <div className={styles.metricDetails}>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Свободно</div>
                                <div className={styles.detailValue}>{formatBytes(metrics.disk.free)}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.metricCard}>
                        <h3>Сеть</h3>
                        <div className={styles.metricDetails}>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Входящий</div>
                                <div className={styles.detailValue}>{formatBytes(metrics.network.bytesIn)}/мин</div>
                            </div>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Исходящий</div>
                                <div className={styles.detailValue}>{formatBytes(metrics.network.bytesOut)}/мин</div>
                            </div>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Соединения</div>
                                <div className={styles.detailValue}>{metrics.network.connections}</div>
                            </div>
                            <div className={styles.detail}>
                                <div className={styles.detailLabel}>Ошибки</div>
                                <div className={styles.detailValue}>{metrics.network.errors}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.servicesSection}>
                <div className={styles.sectionHeader}>
                    <h3>Сервисы ({services?.length})</h3>
                </div>
                <div className={styles.servicesGrid}>
                    {services?.map(service => (
                        <div key={service.id} className={styles.serviceCard}>
                            <div className={styles.serviceHeader}>
                                <span className={styles.serviceName}>{service.name}</span>
                                <span className={styles.serviceType}>{service.type}</span>
                            </div>
                            <span className={`${styles.serviceStatus} ${styles[service.status]}`}>
                                {service.status === 'healthy' ? 'Здоров' :
                                    service.status === 'degraded' ? 'Деградация' :
                                        service.status === 'down' ? 'Отключен' : 'Обслуживание'}
                            </span>

                            <div className={styles.serviceMetrics}>
                                <div className={styles.metric}>
                                    <div className={styles.metricLabel}>CPU</div>
                                    <div className={styles.metricValue}>{service.metrics.cpu}%</div>
                                </div>
                                <div className={styles.metric}>
                                    <div className={styles.metricLabel}>RAM</div>
                                    <div className={styles.metricValue}>{service.metrics.memory}%</div>
                                </div>
                                <div className={styles.metric}>
                                    <div className={styles.metricLabel}>Диск</div>
                                    <div className={styles.metricValue}>{service.metrics.disk}%</div>
                                </div>
                            </div>

                            {service.metrics.connections !== undefined && (
                                <div className={styles.serviceMetric}>
                                    <span className={styles.metricLabel}>Соединения:</span>
                                    <span className={styles.metricValue}>{service.metrics.connections}</span>
                                </div>
                            )}

                            <div className={styles.serviceFooter}>
                                <span>🕒 {formatUptime(service.uptime)}</span>
                                <span className={styles.responseTime}>{service.responseTime}ms</span>
                            </div>

                            {service.message && (
                                <div className={styles.serviceMessage}>⚠ {service.message}</div>
                            )}

                            <div className={styles.serviceActions}>
                                <button onClick={() => handleRestart(service.id)}>Перезапустить</button>
                                {service.status === 'down' ? (
                                    <button onClick={() => handleStart(service.id)}>Запустить</button>
                                ) : (
                                    <button onClick={() => handleStop(service.id)}>Остановить</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.logsSection}>
                <div className={styles.sectionHeader}>
                    <h3>Логи диагностики</h3>
                </div>

                <div className={styles.filtersBar}>
                    <input
                        type="text"
                        placeholder="Поиск по логам..."
                        value={logSearch}
                        onChange={(e) => setLogSearch(e.target.value)}
                    />
                    <select value={logLevel} onChange={(e) => setLogLevel(e.target.value)}>
                        <option value="">Все уровни</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                        <option value="debug">Debug</option>
                    </select>
                </div>

                <div className={styles.logsTable}>
                    <table>
                        <thead>
                        <tr>
                            <th>Время</th>
                            <th>Уровень</th>
                            <th>Компонент</th>
                            <th>Сообщение</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs?.items.map(log => (
                            <tr key={log.id}>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                                <td>
                                        <span className={`${styles.logLevel} ${styles[log.level]}`}>
                                            {log.level}
                                        </span>
                                </td>
                                <td>{log.component}</td>
                                <td>{log.message}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {logs && logs.totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setLogsPage(p => p - 1)}
                            disabled={logsPage === 1}
                        >
                            ←
                        </button>
                        <span>{logsPage} / {logs.totalPages}</span>
                        <button
                            onClick={() => setLogsPage(p => p + 1)}
                            disabled={logsPage === logs.totalPages}
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}