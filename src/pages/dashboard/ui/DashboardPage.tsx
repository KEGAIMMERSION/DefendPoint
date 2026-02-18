import React from "react"
import {useGetDashboardStatsQuery, useGetTrafficDataQuery} from "@entities/dashboard/api/dashboardApi"
import {Card} from "@shared/ui/Card/Card.tsx"
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts"
import styles from "./DashboardPage.module.scss"

export const DashboardPage: React.FC = () => {
    const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery()
    const { data: trafficData, isLoading: trafficLoading } = useGetTrafficDataQuery()

    const [activeFilter, setActiveFilter] = React.useState('today')

    if (statsLoading || trafficLoading) {
        return <div className={styles.loading}>Загрузка...</div>
    }

    const chartData = trafficData?.labels.map((label, index) => ({
        month: label,
        value: trafficData.datasets[0].data[index]
    })) || []

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Главная</h1>
                <div className={styles.date}>
                    {new Date().toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </div>
            </div>

            <div className={styles.filters}>
                <button
                    className={activeFilter === 'today' ? styles.active : ''}
                    onClick={() => setActiveFilter('today')}
                >
                    За сегодня
                </button>
                <button
                    className={activeFilter === 'week' ? styles.active : ''}
                    onClick={() => setActiveFilter('week')}
                >
                    За неделю
                </button>
                <button
                    className={activeFilter === 'month' ? styles.active : ''}
                    onClick={() => setActiveFilter('month')}
                >
                    За месяц
                </button>
            </div>

            <div className={styles.kpiGrid}>
                {stats?.topOrders?.map((item, index) => (
                    <Card
                        key={index}
                        title={item.name}
                        value={item.value}
                        change={item.change}
                        changeLabel={`$${item.today?.toLocaleString() || '0'} today`}
                        suffix={item.suffix}
                    />
                ))}
            </div>

            <div className={styles.chartsRow}>
                <div className={styles.chartCard}>
                    <h3>Total Revenue</h3>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="month" stroke="#888" />
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
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3>Monthly Traffic Channel</h3>
                    <div className={styles.trafficStats}>
                        <div className={styles.stat}>
                            <div className={styles.label}>Total Visitor</div>
                            <div className={styles.value}>125.4K</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.label}>Total Purchase</div>
                            <div className={styles.value}>89.2K</div>
                        </div>
                        <div className={styles.stat}>
                            <div className={styles.label}>Socializing</div>
                            <div className={styles.value}>45.1K</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}