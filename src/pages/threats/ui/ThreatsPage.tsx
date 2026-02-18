import React, {useState} from "react"
import {useGetThreatsQuery} from "@entities/threats/api/threatsApi";
import {ThreatsTable} from "@features/threats/threats-table"
import type {ThreatSeverity, ThreatStatus} from "@entities/threats/model/types.ts";
import styles from "./ThreatsPage.module.scss"

export const ThreatsPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [severity, setSeverity] = useState<ThreatSeverity | ''>('')
    const [status, setStatus] = useState<ThreatStatus | ''>('')

    const { data, isLoading, error, refetch } = useGetThreatsQuery({
        page,
        limit: 10,
        search: search || undefined,
        severity: severity || undefined,
        status: status || undefined,
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const handleSeverityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as ThreatSeverity | ''
        setSeverity(value)
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as ThreatStatus | ''
        setStatus(value)
    }

    const handleApplyFilters = () => {
        setPage(1)
        setShowFilters(false)
    }

    const handleResetFilters = () => {
        setSeverity('')
        setStatus('')
        setSearch('')
        setPage(1)
        setShowFilters(false)
    }

    // Статистика для карточек
    const stats = {
        total: data?.total || 0,
        critical: data?.items?.filter(t => t.severity === 'critical').length || 0,
        active: data?.items?.filter(t => t.status === 'active').length || 0,
        investigating: data?.items?.filter(t => t.status === 'investigating').length || 0,
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
        <div className={styles.threatsPage}>
            <div className={styles.header}>
                <h1>Угрозы безопасности</h1>

                <div className={styles.actions}>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Поиск по названию, ID, типу..."
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
                            <option value="active">Активные</option>
                            <option value="investigating">Расследование</option>
                            <option value="resolved">Решенные</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Период</label>
                        <select>
                            <option>За все время</option>
                            <option>Последние 24 часа</option>
                            <option>Последние 7 дней</option>
                            <option>Последние 30 дней</option>
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
                        Всего угроз
                    </div>
                    <div className={styles.statValue}>{stats.total}</div>
                    <div className={styles.statDetail}>за последние 30 дней</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>🔥</span>
                        Критических
                    </div>
                    <div className={styles.statValue}>{stats.critical}</div>
                    <div className={`${styles.statChange} ${styles.positive}`}>+12%</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>⚠️</span>
                        Активных
                    </div>
                    <div className={styles.statValue}>{stats.active}</div>
                    <div className={`${styles.statChange} ${styles.negative}`}>-5%</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <span className={styles.icon}>🔍</span>
                        В расследовании
                    </div>
                    <div className={styles.statValue}>{stats.investigating}</div>
                    <div className={styles.statDetail}>требуют внимания</div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h3>Список угроз</h3>
                    <div className={styles.tableActions}>
                        <button>📥 Экспорт</button>
                        <button>📋 Выбрать все</button>
                    </div>
                </div>

                {isLoading ? (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <span>Загрузка данных об угрозах...</span>
                    </div>
                ) : (
                    <ThreatsTable
                        data={data?.items}
                        isLoading={isLoading}
                        onPageChange={setPage}
                        totalPages={data?.totalPages}
                        currentPage={page}
                    />
                )}
            </div>
        </div>
    )
}