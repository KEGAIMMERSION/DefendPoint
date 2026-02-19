import React, {useState} from "react"
import {
    useGetDashboardStatsQuery,
    useGetTrafficDataQuery,
    useGetThreatsByTypeQuery,
    useGetHourlyActivityQuery,
    useGetTopAttackersQuery,
    useGetRemindersQuery
} from "@entities/dashboard/api/dashboardApi"
import {
    AreaChart, Area,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from "recharts"
import styles from "./DashboardPage.module.scss"

export const DashboardPage: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day')
    const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery()
    const { data: traffic, isLoading: trafficLoading } = useGetTrafficDataQuery()
    const { data: threatsByType } = useGetThreatsByTypeQuery()
    const { data: hourlyActivity } = useGetHourlyActivityQuery()
    const { data: topAttackers } = useGetTopAttackersQuery()
    const { data: reminders } = useGetRemindersQuery()

    const trafficChartData = traffic?.labels.map((label, index) => ({
        month: label,
        revenue: traffic.datasets[0].data[index]
    })) || []

    const formatNumber = (num: number = 0): string => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toString()
    }

    const getPriorityClass = (priority: string = 'low') => {
        switch (priority) {
            case 'high': return styles.priorityHigh
            case 'medium': return styles.priorityMedium
            case 'low': return styles.priorityLow
            default: return ''
        }
    }

    if (statsLoading || trafficLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingText}>Загрузка данных дашборда...</div>
            </div>
        )
    }

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.pageTitle}>Панель управления</h1>
                    <p className={styles.pageSubtitle}>
                        {new Date().toLocaleDateString('ru-RU', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
                <div className={styles.timeRangeTabs}>
                    <button
                        className={`${styles.timeTab} ${timeRange === 'day' ? styles.active : ''}`}
                        onClick={() => setTimeRange('day')}
                    >
                        День
                    </button>
                    <button
                        className={`${styles.timeTab} ${timeRange === 'week' ? styles.active : ''}`}
                        onClick={() => setTimeRange('week')}
                    >
                        Неделя
                    </button>
                    <button
                        className={`${styles.timeTab} ${timeRange === 'month' ? styles.active : ''}`}
                        onClick={() => setTimeRange('month')}
                    >
                        Месяц
                    </button>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Всего событий</div>
                    <div className={styles.statValue}>{formatNumber(stats?.totalEvents)}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendUp}>+12.5%</span>
                        <span className={styles.trendPeriod}>за сегодня</span>
                    </div>
                    <div className={styles.statGraph}>
                        <div className={styles.graphBar} style={{ height: '60%' }}></div>
                        <div className={styles.graphBar} style={{ height: '80%' }}></div>
                        <div className={styles.graphBar} style={{ height: '45%' }}></div>
                        <div className={styles.graphBar} style={{ height: '90%' }}></div>
                        <div className={styles.graphBar} style={{ height: '70%' }}></div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Критические угрозы</div>
                    <div className={styles.statValue}>{stats?.criticalThreats || 0}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendUp}>+3</span>
                        <span className={styles.trendPeriod}>новых</span>
                    </div>
                    <div className={styles.statBadge}>Требуют внимания</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Уникальные IP</div>
                    <div className={styles.statValue}>{formatNumber(stats?.uniqueIPs)}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendDown}>-2.3%</span>
                        <span className={styles.trendPeriod}>чем вчера</span>
                    </div>
                    <div className={styles.statCountries}>
                        <span>RU 45%</span>
                        <span>CN 23%</span>
                        <span>US 18%</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Средний риск</div>
                    <div className={styles.statValue}>{stats?.averageRisk || 0}</div>
                    <div className={styles.statTrend}>
                        <span className={styles.trendNeutral}>● {stats?.averageRisk || 0}</span>
                        <span className={styles.trendPeriod}>/10</span>
                    </div>
                    <div className={styles.statRiskBar}>
                        <div className={styles.riskFill} style={{ width: `${(stats?.averageRisk || 0) * 10}%` }}></div>
                    </div>
                </div>
            </div>

            <div className={styles.chartsRow}>
                <div className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <h3>Динамика трафика</h3>
                        <div className={styles.chartLegend}>
                <span className={styles.legendItem}>
                    <span className={styles.legendColor} style={{ background: '#3b82f6' }}></span>
                    Трафик
                </span>
                        </div>
                    </div>
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficChartData}>
                                <defs>
                                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="month" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(20,20,20,0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3b82f6"
                                    fillOpacity={1}
                                    fill="url(#colorTraffic)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Распределение угроз</h3>
                    <div className={styles.pieChartContainer}>
                        <div>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={threatsByType}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {threatsByType?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
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
                        <div className={styles.chartLabels}>
                            {threatsByType?.map((item, index) => (
                                <div key={index} className={styles.chartLabel}>
                                    <span className={styles.labelDot} style={{ background: item.color }}></span>
                                    <span className={styles.labelName}>{item.name}</span>
                                    <span className={styles.labelValue}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.chartsRow}>
                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Активность по часам</h3>
                    <div className={styles.chartContainer} style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={hourlyActivity}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="hour" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(20,20,20,0.95)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px'
                                    }}
                                />
                                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Топ атакующих IP</h3>
                    <div className={styles.topList}>
                        {topAttackers && topAttackers.length > 0 ? (
                            topAttackers.map((attacker, index) => (
                                <div key={index} className={styles.topItem}>
                                    <span className={styles.topRank}>{index + 1}</span>
                                    <span className={styles.topIp}>{attacker.ip}</span>
                                    <span className={styles.topCountry}>{attacker.country}</span>
                                    <span className={styles.topValue}>{attacker.attacks}</span>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyState}>Нет данных об атакующих IP</div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.remindersSection}>
                <h3 className={styles.remindersTitle}>Напоминания</h3>
                <div className={styles.remindersList}>
                    {reminders && reminders.length > 0 ? (
                        reminders.map(reminder => (
                            <div key={reminder.id} className={styles.reminderItem}>
                                <div className={styles.reminderContent}>
                                    <div className={styles.reminderTitle}>{reminder.title}</div>
                                    <div className={styles.reminderMeta}>
                                        <span className={`${styles.reminderPriority} ${getPriorityClass(reminder.priority)}`}>
                                            {reminder.priority === 'high' ? 'Высокий' :
                                                reminder.priority === 'medium' ? 'Средний' : 'Низкий'}
                                        </span>
                                        <span className={styles.reminderDue}>через {reminder.due}</span>
                                    </div>
                                </div>
                                <button className={styles.reminderAction}>✓</button>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>Нет активных напоминаний</div>
                    )}
                </div>
                <button className={styles.addReminderButton}>+ Добавить напоминание</button>
            </div>
        </div>
    )
}