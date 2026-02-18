import React, {useState} from "react"
import {
    useGetLogsQuery,
    useGetLogStatsQuery,
    useClearLogsMutation,
} from "@entities/logs/api/logsApi"
import styles from "./LogsPage.module.scss"

export const LogsPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [level, setLevel] = useState('')
    const [source, setSource] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const { data: logs, isLoading } = useGetLogsQuery({
        page,
        limit: 50,
        level: level || undefined,
        source: source || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        search: search || undefined,
    })

    const { data: stats } = useGetLogStatsQuery({ period: 'day' })
    const [clearLogs] = useClearLogsMutation()

    const handleClear = async () => {
        if (confirm('Очистить все логи старше 30 дней?')) {
            const date = new Date()
            date.setDate(date.getDate() - 30)
            await clearLogs({ olderThan: date.toISOString() })
        }
    }

    const handleExport = () => {
        console.log('Export logs')
    }

    const getLevelLabel = (level: string): string => {
        switch (level) {
            case 'info': return 'INFO'
            case 'warn': return 'WARN'
            case 'error': return 'ERROR'
            case 'debug': return 'DEBUG'
            default: return level
        }
    }

    const getSourceLabel = (source: string): string => {
        switch (source) {
            case 'system': return 'Система'
            case 'application': return 'Приложение'
            case 'security': return 'Безопасность'
            case 'audit': return 'Аудит'
            case 'network': return 'Сеть'
            default: return source
        }
    }

    if (isLoading) {
        return <div className={styles.loading}>Загрузка журналов...</div>
    }

    return (
        <div className={styles.logsPage}>
            <h1 className={styles.pageTitle}>Журналы системы</h1>
            <p className={styles.pageSubtitle}>Просмотр и анализ системных событий</p>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Всего записей</div>
                    <div className={styles.statValue}>{stats?.total.toLocaleString() || 0}</div>
                    <div className={styles.statDetail}>за все время</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>За последний час</div>
                    <div className={styles.statValue}>{stats?.lastHour || 0}</div>
                    <div className={styles.statDetail}>новых записей</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Ошибки</div>
                    <div className={styles.statValue}>{stats?.errorsLastHour || 0}</div>
                    <div className={styles.statDetail}>за последний час</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>За 24 часа</div>
                    <div className={styles.statValue}>{stats?.lastDay || 0}</div>
                    <div className={styles.statDetail}>всего записей</div>
                </div>
            </div>

            <div className={styles.filtersBar}>
                <div className={styles.searchField}>
                    <input
                        type="text"
                        placeholder="Поиск по логам..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className={styles.filterSelect}>
                    <select value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="">Все уровни</option>
                        <option value="info">INFO</option>
                        <option value="warn">WARN</option>
                        <option value="error">ERROR</option>
                        <option value="debug">DEBUG</option>
                    </select>
                </div>

                <div className={styles.filterSelect}>
                    <select value={source} onChange={(e) => setSource(e.target.value)}>
                        <option value="">Все источники</option>
                        <option value="system">Система</option>
                        <option value="application">Приложение</option>
                        <option value="security">Безопасность</option>
                        <option value="audit">Аудит</option>
                        <option value="network">Сеть</option>
                    </select>
                </div>

                <div className={styles.dateRange}>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span>—</span>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <button className={styles.clearButton} onClick={handleClear}>
                    Очистить старые
                </button>
            </div>

            <div className={styles.logsTable}>
                <div className={styles.tableHeader}>
                    <h3>Системные логи</h3>
                    <button className={styles.exportButton} onClick={handleExport}>
                        Экспорт
                    </button>
                </div>

                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                        <tr>
                            <th>Время</th>
                            <th>Уровень</th>
                            <th>Источник</th>
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
                                            {getLevelLabel(log.level)}
                                        </span>
                                </td>
                                <td>
                                        <span className={styles.logSource}>
                                            {getSourceLabel(log.source)}
                                        </span>
                                </td>
                                <td>{log.component}</td>
                                <td>
                                    <div className={styles.logMessage}>{log.message}</div>
                                    {log.userId && (
                                        <div className={styles.logDetails}>
                                            {log.username && <span>👤 {log.username}</span>}
                                            {log.ip && <span>🌐 {log.ip}</span>}
                                            {log.requestId && <span>🔗 {log.requestId}</span>}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {logs && logs.totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setPage(p => p - 1)}
                            disabled={page === 1}
                        >
                            ←
                        </button>
                        <span>{page} / {logs.totalPages}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page === logs.totalPages}
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}