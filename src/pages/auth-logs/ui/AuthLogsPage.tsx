import React, {useState} from "react"
import {
    useGetAuthLogsQuery,
    useGetAuthStatsQuery
} from "@entities/auth-logs/api/authLogsApi"
import {
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts"
import type {AuthEventType, AuthStatus} from "@entities/auth-logs/model/types.ts"
import styles from "./AuthLogsPage.module.scss"

export const AuthLogsPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [eventType, setEventType] = useState<AuthEventType | ''>('')
    const [status, setStatus] = useState<AuthStatus | ''>('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [statsPeriod, setStatsPeriod] = useState<'day' | 'week' | 'month'>('day')

    const { data, isLoading, error, refetch } = useGetAuthLogsQuery({
        page,
        limit: 20,
        search: search || undefined,
        eventType: eventType || undefined,
        status: status || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
    })

    const { data: stats } = useGetAuthStatsQuery({ period: statsPeriod })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEventType(e.target.value as AuthEventType | '')
        setPage(1)
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as AuthStatus | '')
        setPage(1)
    }

    const handleResetFilters = () => {
        setSearch('')
        setEventType('')
        setStatus('')
        setStartDate('')
        setEndDate('')
        setPage(1)
    }

    const getEventTypeClass = (type: string): string => {
        switch (type) {
            case 'login': return styles.login
            case 'logout': return styles.logout
            case 'failed_login': return styles.failed
            case 'mfa': return styles.mfa
            case 'blocked': return styles.blocked
            default: return ''
        }
    }

    const getEventTypeLabel = (type: string): string => {
        switch (type) {
            case 'login': return 'Вход в систему'
            case 'logout': return 'Выход из системы'
            case 'failed_login': return 'Неудачная попытка входа'
            case 'password_change': return 'Смена пароля'
            case 'mfa': return 'MFA подтверждение'
            case 'permission_change': return 'Изменение прав доступа'
            default: return type
        }
    }

    const getStatusClass = (status: string): string => {
        switch (status) {
            case 'success': return styles.success
            case 'failure': return styles.failure
            case 'blocked': return styles.blocked
            case 'suspicious': return styles.suspicious
            default: return ''
        }
    }

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'success': return 'Успешно'
            case 'failure': return 'Ошибка'
            case 'blocked': return 'Заблокировано'
            case 'suspicious': return 'Подозрительно'
            default: return status
        }
    }

    const formatDateTime = (timestamp: string): string => {
        const date = new Date(timestamp)
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const COLORS = ['#10b981', '#ef4444', '#f97316', '#6366f1', '#8b5cf6', '#ec4899']

    if (error) {
        return (
            <div className={styles.errorState}>
                <div className={styles.errorMessage}>Ошибка загрузки данных</div>
                <button className={styles.retryButton} onClick={() => refetch()}>
                    Повторить попытку
                </button>
            </div>
        )
    }

    return (
        <div className={styles.authLogsPage}>
            <h1 className={styles.pageTitle}>Журнал авторизации</h1>
            <p className={styles.pageSubtitle}>Мониторинг событий входа и активности пользователей</p>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Всего входов</div>
                    <div className={styles.statValue}>{stats?.totalLogins?.toLocaleString() || 0}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendUp}>12%</span>
                        <span className={styles.trendText}>за сегодня</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Успешных</div>
                    <div className={styles.statValue}>{stats?.successfulLogins?.toLocaleString() || 0}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendUp}>8%</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Неудачных</div>
                    <div className={styles.statValue}>{stats?.failedLogins?.toLocaleString() || 0}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendDown}>3%</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Заблокировано</div>
                    <div className={styles.statValue}>{stats?.blockedAttempts?.toLocaleString() || 0}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendNeutral}>0%</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Уникальных</div>
                    <div className={styles.statValue}>{stats?.uniqueUsers?.toLocaleString() || 0}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendText}>пользователей</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>MFA</div>
                    <div className={styles.statValue}>{stats?.mfaUsage || 0}%</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendText}>использование</span>
                    </div>
                </div>
            </div>

            <div className={styles.chartsRow}>
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <h3>Активность по часам</h3>
                        <div className={styles.periodTabs}>
                            <button
                                className={statsPeriod === 'day' ? styles.active : ''}
                                onClick={() => setStatsPeriod('day')}
                            >
                                День
                            </button>
                            <button
                                className={statsPeriod === 'week' ? styles.active : ''}
                                onClick={() => setStatsPeriod('week')}
                            >
                                Неделя
                            </button>
                            <button
                                className={statsPeriod === 'month' ? styles.active : ''}
                                onClick={() => setStatsPeriod('month')}
                            >
                                Месяц
                            </button>
                        </div>
                    </div>
                    <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats?.loginsByHour || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="hour" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(20,20,20,0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#818cf8"
                                    strokeWidth={2}
                                    dot={{ fill: '#818cf8', r: 4 }}
                                    activeDot={{ r: 6, fill: '#a5b4fc' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3>География входов</h3>
                    <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats?.topLocations || []}
                                    dataKey="count"
                                    nameKey="location"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    labelLine={false}
                                    label={({ location, percent }) =>
                                        `${location} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {(stats?.topLocations || []).map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth={1}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(20,20,20,0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className={styles.filtersBar}>
                <div className={styles.searchField}>
                    <input
                        type="text"
                        placeholder="Поиск по пользователю или IP..."
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className={styles.filterSelect}>
                    <select value={eventType} onChange={handleEventTypeChange}>
                        <option value="">Все события</option>
                        <option value="login">Вход в систему</option>
                        <option value="logout">Выход из системы</option>
                        <option value="failed_login">Неудачные попытки</option>
                        <option value="password_change">Смена пароля</option>
                        <option value="mfa">MFA подтверждение</option>
                    </select>
                </div>

                <div className={styles.filterSelect}>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="">Все статусы</option>
                        <option value="success">Успешно</option>
                        <option value="failure">Ошибка</option>
                        <option value="blocked">Заблокировано</option>
                        <option value="suspicious">Подозрительно</option>
                    </select>
                </div>

                <div className={styles.dateRange}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="От"
                    />
                    <span>—</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="До"
                    />
                </div>

                <button className={styles.resetButton} onClick={handleResetFilters}>
                    Сбросить фильтры
                </button>
            </div>

            <div className={styles.tableSection}>
                <div className={styles.tableHeader}>
                    <h3>События авторизации</h3>
                    <div className={styles.tableActions}>
                        <button>Экспорт CSV</button>
                        <button>Выбрать все</button>
                    </div>
                </div>

                {isLoading ? (
                    <div className={styles.loadingState}>
                        <div className={styles.spinner}></div>
                        <span>Загрузка данных...</span>
                    </div>
                ) : (
                    <>
                        <div className={styles.tableContainer}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Время</th>
                                    <th>Событие</th>
                                    <th>Пользователь</th>
                                    <th>IP / Локация</th>
                                    <th>Устройство</th>
                                    <th>Статус</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data?.items.map((log) => (
                                    <tr key={log.id}>
                                        <td>{formatDateTime(log.timestamp)}</td>
                                        <td>
                        <span className={`${styles.eventBadge} ${getEventTypeClass(log.eventType)}`}>
                          {getEventTypeLabel(log.eventType)}
                        </span>
                                        </td>
                                        <td>
                                            <div className={styles.userCell}>
                                                <span className={styles.userName}>{log.username || 'Неизвестно'}</span>
                                                <span className={styles.userRole}>{log.userRole || 'Пользователь'}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.ipCell}>
                                                <span className={styles.ipAddress}>{log.ipAddress}</span>
                                                {log.location && (
                                                    <span className={styles.location}>{log.location}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.deviceCell}>
                                                {log.device && <span className={styles.deviceName}>{log.device}</span>}
                                                {log.browser && log.os && (
                                                    <span className={styles.browserInfo}>
                              {log.browser} • {log.os}
                            </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                        <span className={`${styles.statusBadge} ${getStatusClass(log.status)}`}>
                          {getStatusLabel(log.status)}
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {data && data.totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    className={styles.paginationButton}
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                >
                                    ←
                                </button>

                                <span className={styles.paginationInfo}>
                  {page} / {data.totalPages}
                </span>

                                <button
                                    className={styles.paginationButton}
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === data.totalPages}
                                >
                                    →
                                </button>
                            </div>
                        )}

                        {(!data?.items || data.items.length === 0) && !isLoading && (
                            <div className={styles.emptyState}>
                                <p>Нет данных для отображения</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}