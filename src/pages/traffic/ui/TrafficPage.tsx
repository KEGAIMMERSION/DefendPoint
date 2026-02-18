import React, {useState} from "react"
import {
    useGetTrafficQuery,
    useGetTrafficStatsQuery,
    useGetBandwidthHistoryQuery,
    useGetProtocolDistributionQuery,
    useBlockTrafficMutation,
    useAllowTrafficMutation
} from "@entities/traffic/api/trafficApi"
import {TrafficTable} from "@features/traffic/traffic-table/ui/TrafficTable.tsx"
import {
    AreaChart, Area,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from "recharts"
import type {TrafficProtocol, TrafficDirection, TrafficStatus} from "@entities/traffic/model/types.ts"
import styles from "./TrafficPage.module.scss"

export const TrafficPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [protocol, setProtocol] = useState<TrafficProtocol | ''>('')
    const [direction, setDirection] = useState<TrafficDirection | ''>('')
    const [status, setStatus] = useState<TrafficStatus | ''>('')
    const [timeRange, setTimeRange] = useState<'hour' | 'day' | 'week'>('day')

    const { data, isLoading, error, refetch } = useGetTrafficQuery({
        page,
        limit: 20,
        search: search || undefined,
        protocol: protocol || undefined,
        direction: direction || undefined,
        status: status || undefined,
    })

    const { data: stats } = useGetTrafficStatsQuery()
    const { data: bandwidthData } = useGetBandwidthHistoryQuery({ interval: timeRange })
    const { data: protocolData } = useGetProtocolDistributionQuery({ period: 'today' })

    const [blockTraffic] = useBlockTrafficMutation()
    const [allowTraffic] = useAllowTrafficMutation()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const handleProtocolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProtocol(e.target.value as TrafficProtocol | '')
    }

    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value as TrafficDirection | '')
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as TrafficStatus | '')
    }

    const handleApplyFilters = () => {
        setPage(1)
        setShowFilters(false)
    }

    const handleResetFilters = () => {
        setProtocol('')
        setDirection('')
        setStatus('')
        setSearch('')
        setPage(1)
        setShowFilters(false)
    }

    const handleBlock = async (id: string) => {
        try {
            await blockTraffic(id).unwrap()
        } catch (error) {
            console.error('Failed to block traffic:', error)
        }
    }

    const handleAllow = async (id: string) => {
        try {
            await allowTraffic(id).unwrap()
        } catch (error) {
            console.error('Failed to allow traffic:', error)
        }
    }

    const handleViewDetails = (id: string) => {
        console.log('View details:', id)
    }

    const formatBytes = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
        if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB'
        return (bytes / 1073741824).toFixed(1) + ' GB'
    }

    const COLORS = ['#3b82f6', '#f97316', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']

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
        <div className={styles.trafficPage}>
            <div className={styles.header}>
                <h1>Анализ трафика</h1>

                <div className={styles.actions}>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Поиск по IP, протоколу..."
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

                    <button className={styles.dateRangeButton}>
                        <span>📅</span>
                        <span>Последние 24 часа</span>
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className={styles.filtersPanel}>
                    <div className={styles.filterGroup}>
                        <label>Протокол</label>
                        <select value={protocol} onChange={handleProtocolChange}>
                            <option value="">Все</option>
                            <option value="TCP">TCP</option>
                            <option value="UDP">UDP</option>
                            <option value="ICMP">ICMP</option>
                            <option value="HTTP">HTTP</option>
                            <option value="HTTPS">HTTPS</option>
                            <option value="DNS">DNS</option>
                            <option value="SSH">SSH</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Направление</label>
                        <select value={direction} onChange={handleDirectionChange}>
                            <option value="">Все</option>
                            <option value="inbound">Входящий</option>
                            <option value="outbound">Исходящий</option>
                            <option value="internal">Внутренний</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Статус</label>
                        <select value={status} onChange={handleStatusChange}>
                            <option value="">Все</option>
                            <option value="allowed">Разрешено</option>
                            <option value="blocked">Заблокировано</option>
                            <option value="suspicious">Подозрительно</option>
                            <option value="monitored">Мониторинг</option>
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
                        Всего трафика
                    </div>
                    <div className={styles.statValue}>
                        {formatBytes(stats?.totalBytes || 0)}
                    </div>
                    <div className={styles.statDetail}>
                        <span className={styles.inbound}>↓ {formatBytes(stats?.inboundBytes || 0)}</span>
                        <span className={styles.outbound}>↑ {formatBytes(stats?.outboundBytes || 0)}</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>📦</span>
                        Всего пакетов
                    </div>
                    <div className={styles.statValue}>
                        {(stats?.totalPackets || 0).toLocaleString()}
                    </div>
                    <div className={styles.statDetail}>
                        {stats?.totalFlows || 0} потоков
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>🔌</span>
                        Активных соединений
                    </div>
                    <div className={styles.statValue}>
                        {stats?.activeConnections || 0}
                    </div>
                    <div className={styles.statDetail}>
                        {stats?.topProtocols?.[0]?.protocol || 'TCP'} - основной
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>⚠️</span>
                        Подозрительный трафик
                    </div>
                    <div className={styles.statValue}>
                        {stats?.topSources?.filter(s => s.bytes > 1000000).length || 0}
                    </div>
                    <div className={styles.statDetail}>
                        источников больше 1 MB
                    </div>
                </div>
            </div>

            <div className={styles.chartsRow}>
                <div className={styles.chartCard}>
                    <div className={styles.chartControls}>
                        <h3>Использование пропускной способности</h3>
                        <div>
                            <button
                                className={timeRange === 'hour' ? styles.active : ''}
                                onClick={() => setTimeRange('hour')}
                            >
                                Час
                            </button>
                            <button
                                className={timeRange === 'day' ? styles.active : ''}
                                onClick={() => setTimeRange('day')}
                            >
                                День
                            </button>
                            <button
                                className={timeRange === 'week' ? styles.active : ''}
                                onClick={() => setTimeRange('week')}
                            >
                                Неделя
                            </button>
                        </div>
                    </div>
                    <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={bandwidthData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="time" stroke="#888" />
                                <YAxis stroke="#888" tickFormatter={formatBytes} />
                                <Tooltip
                                    formatter={(value: number) => formatBytes(value)}
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid #333',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="inbound"
                                    name="Входящий"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.3}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="outbound"
                                    name="Исходящий"
                                    stroke="#f97316"
                                    fill="#f97316"
                                    fillOpacity={0.3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3>Распределение по протоколам</h3>
                    <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={protocolData}
                                    dataKey="bytes"
                                    nameKey="protocol"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={(entry) => entry.protocol}
                                >
                                    {protocolData?.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => formatBytes(value)}
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid #333',
                                        borderRadius: '8px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h3>Потоки трафика</h3>
                    <div className={styles.tableActions}>
                        <button>📥 Экспорт</button>
                        <button>📋 Выбрать все</button>
                    </div>
                </div>

                <TrafficTable
                    data={data?.items}
                    isLoading={isLoading}
                    onPageChange={setPage}
                    totalPages={data?.totalPages}
                    currentPage={page}
                    onBlock={handleBlock}
                    onAllow={handleAllow}
                    onViewDetails={handleViewDetails}
                />
            </div>
        </div>
    )
}