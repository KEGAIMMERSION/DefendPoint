import React, {useState} from "react"
import {
    useGetAnomaliesQuery,
    useGetAnomalyStatsQuery,
    useGetAnomalyTimelineQuery,
    useUpdateAnomalyStatusMutation,
    useAssignAnomalyMutation,
    useResolveAnomalyMutation
} from "@entities/anomalies/api/anomaliesApi"
import {AnomaliesTable} from "@features/anomalies/anomalies-table/ui/AnomaliesTable.tsx"
import {
    LineChart, Line,
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from "recharts"
import type {AnomalyType, AnomalySeverity, AnomalyStatus} from "@entities/anomalies/model/types.ts"
import styles from "./AnomaliesPage.module.scss"

export const AnomaliesPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [type, setType] = useState<AnomalyType | ''>('')
    const [severity, setSeverity] = useState<AnomalySeverity | ''>('')
    const [status, setStatus] = useState<AnomalyStatus | ''>('')
    const [timelinePeriod, setTimelinePeriod] = useState<'day' | 'week' | 'month'>('day')

    const { data, isLoading, error, refetch } = useGetAnomaliesQuery({
        page,
        limit: 20,
        search: search || undefined,
        type: type || undefined,
        severity: severity || undefined,
        status: status || undefined,
    })

    const { data: stats } = useGetAnomalyStatsQuery()
    const { data: timelineData } = useGetAnomalyTimelineQuery({ period: timelinePeriod })

    const [updateStatus] = useUpdateAnomalyStatusMutation()
    const [assignAnomaly] = useAssignAnomalyMutation()
    const [resolveAnomaly] = useResolveAnomalyMutation()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as AnomalyType | '')
    }

    const handleSeverityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSeverity(e.target.value as AnomalySeverity | '')
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as AnomalyStatus | '')
    }

    const handleApplyFilters = () => {
        setPage(1)
        setShowFilters(false)
    }

    const handleResetFilters = () => {
        setType('')
        setSeverity('')
        setStatus('')
        setSearch('')
        setPage(1)
        setShowFilters(false)
    }

    const handleStatusUpdate = async (id: string, newStatus: AnomalyStatus) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap()
        } catch (error) {
            console.error('Failed to update anomaly status:', error)
        }
    }

    const handleAssign = async (id: string) => {
        const user = prompt('Введите имя пользователя для назначения:')
        if (user) {
            try {
                await assignAnomaly({ id, assignedTo: user }).unwrap()
            } catch (error) {
                console.error('Failed to assign anomaly:', error)
            }
        }
    }

    const handleResolve = async (id: string) => {
        const notes = prompt('Добавьте заметку (необязательно):')
        try {
            await resolveAnomaly({ id, notes: notes || undefined }).unwrap()
        } catch (error) {
            console.error('Failed to resolve anomaly:', error)
        }
    }

    const handleViewDetails = (id: string) => {
        console.log('View details:', id)
        // Открыть модальное окно с деталями
    }

    if (error) {
        return (
            <div className={styles.error}>
                <div className={styles.errorIcon}>⚠️</div>
                <span>Ошибка загрузки данных</span>
                <button onClick={() => refetch()}>Повторить</button>
            </div>
        )
    }

    return (
        <div className={styles.anomaliesPage}>
            <div className={styles.header}>
                <h1>Аномалии</h1>

                <div className={styles.actions}>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Поиск аномалий..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>

                    <button
                        className={styles.filterButton}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <span>⚙️</span>
                        <span>Фильтры</span>
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className={styles.filtersPanel}>
                    <div className={styles.filterGroup}>
                        <label>Тип</label>
                        <select value={type} onChange={handleTypeChange}>
                            <option value="">Все</option>
                            <option value="traffic">Трафик</option>
                            <option value="behavior">Поведение</option>
                            <option value="performance">Производительность</option>
                            <option value="security">Безопасность</option>
                            <option value="compliance">Комплаенс</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Критичность</label>
                        <select value={severity} onChange={handleSeverityChange}>
                            <option value="">Все</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Статус</label>
                        <select value={status} onChange={handleStatusChange}>
                            <option value="">Все</option>
                            <option value="new">Новые</option>
                            <option value="investigating">В расследовании</option>
                            <option value="resolved">Решённые</option>
                            <option value="ignored">Игнорируемые</option>
                        </select>
                    </div>

                    <div className={styles.filterActions}>
                        <button onClick={handleApplyFilters}>Применить</button>
                        <button onClick={handleResetFilters}>Сбросить</button>
                    </div>
                </div>
            )}

            <div className={styles.statsCards}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>📊</span>
                        Всего аномалий
                    </div>
                    <div className={styles.statValue}>{stats?.total || 0}</div>
                    <div className={styles.statDetail}>
                        <span className={styles.critical}>🔥 {stats?.criticalCount || 0} критичных</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>🆕</span>
                        Новые
                    </div>
                    <div className={styles.statValue}>{stats?.newCount || 0}</div>
                    <div className={styles.statDetail}>
                        требуют внимания
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>✅</span>
                        Решено сегодня
                    </div>
                    <div className={styles.statValue}>{stats?.resolvedToday || 0}</div>
                    <div className={styles.statDetail}>
                        за последние 24 часа
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>🎯</span>
                        Уверенность
                    </div>
                    <div className={styles.statValue}>{stats?.averageConfidence || 0}%</div>
                    <div className={styles.statDetail}>
                        средняя по всем аномалиям
                    </div>
                </div>
            </div>

            <div className={styles.chartsRow}>
                <div className={styles.chartCard}>
                    <div className={styles.chartControls}>
                        <h3>Динамика аномалий</h3>
                        <div>
                            <button
                                className={timelinePeriod === 'day' ? styles.active : ''}
                                onClick={() => setTimelinePeriod('day')}
                            >
                                День
                            </button>
                            <button
                                className={timelinePeriod === 'week' ? styles.active : ''}
                                onClick={() => setTimelinePeriod('week')}
                            >
                                Неделя
                            </button>
                            <button
                                className={timelinePeriod === 'month' ? styles.active : ''}
                                onClick={() => setTimelinePeriod('month')}
                            >
                                Месяц
                            </button>
                        </div>
                    </div>
                    <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timelineData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="timestamp" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid #333',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    name="Количество"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: '#3b82f6', r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3>Распределение по типам</h3>
                    <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Object.entries(stats?.byType || {}).map(([key, value]) => ({
                                type: key,
                                count: value
                            }))}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="type" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid #333',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h3>Список аномалий</h3>
                    <div className={styles.tableActions}>
                        <button>📥 Экспорт</button>
                        <button>📋 Выбрать все</button>
                    </div>
                </div>

                <AnomaliesTable
                    data={data?.items}
                    isLoading={isLoading}
                    onPageChange={setPage}
                    totalPages={data?.totalPages}
                    currentPage={page}
                    onStatusChange={handleStatusUpdate}
                    onAssign={handleAssign}
                    onResolve={handleResolve}
                    onViewDetails={handleViewDetails}
                />
            </div>
        </div>
    )
}