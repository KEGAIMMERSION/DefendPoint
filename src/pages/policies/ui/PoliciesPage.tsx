import React, {useState} from "react"
import {
    useGetPoliciesQuery,
    useGetPolicyStatsQuery,
    useUpdatePolicyStatusMutation,
    useDeletePolicyMutation,
    useExecutePolicyMutation
} from "@entities/policies/api/policiesApi"
import {PoliciesTable} from "@features/policies/policies-table/ui/PoliciesTable.tsx"
import type {PolicyStatus, PolicyType, PolicyPriority} from "@entities/policies/model/types.ts"
import styles from "./PoliciesPage.module.scss"

export const PoliciesPage: React.FC = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [type, setType] = useState<PolicyType | ''>('')
    const [status, setStatus] = useState<PolicyStatus | ''>('')
    const [priority, setPriority] = useState<PolicyPriority | ''>('')

    const { data, isLoading, error, refetch } = useGetPoliciesQuery({
        page,
        limit: 10,
        search: search || undefined,
        type: type || undefined,
        status: status || undefined,
        priority: priority || undefined,
    })

    const { data: stats } = useGetPolicyStatsQuery()
    const [updateStatus] = useUpdatePolicyStatusMutation()
    const [deletePolicy] = useDeletePolicyMutation()
    const [executePolicy] = useExecutePolicyMutation()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setPage(1)
    }

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value as PolicyType | '')
    }

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as PolicyStatus | '')
    }

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as PolicyPriority | '')
    }

    const handleApplyFilters = () => {
        setPage(1)
        setShowFilters(false)
    }

    const handleResetFilters = () => {
        setType('')
        setStatus('')
        setPriority('')
        setSearch('')
        setPage(1)
        setShowFilters(false)
    }

    const handlePolicyStatusChange = async (id: string, newStatus: PolicyStatus) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap()
        } catch (error) {
            console.error('Failed to update policy status:', error)
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Вы уверены, что хотите удалить эту политику?')) {
            try {
                await deletePolicy(id).unwrap()
            } catch (error) {
                console.error('Failed to delete policy:', error)
            }
        }
    }

    const handleExecute = async (id: string) => {
        try {
            const result = await executePolicy(id).unwrap()
            alert(result.message)
        } catch (error) {
            console.error('Failed to execute policy:', error)
        }
    }

    const handleCreatePolicy = () => {
        console.log('Create policy')
    }

    const handleEditPolicy = (policy: any) => {
        console.log('Edit policy:', policy)
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
        <div className={styles.policiesPage}>
            <div className={styles.header}>
                <h1>Политики безопасности</h1>

                <div className={styles.actions}>
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Поиск политик..."
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

                    <button
                        className={styles.createButton}
                        onClick={handleCreatePolicy}
                    >
                        <span>+</span>
                        <span>Создать политику</span>
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className={styles.filtersPanel}>
                    <div className={styles.filterGroup}>
                        <label>Тип</label>
                        <select value={type} onChange={handleTypeChange}>
                            <option value="">Все</option>
                            <option value="firewall">Firewall</option>
                            <option value="ids">IDS</option>
                            <option value="ips">IPS</option>
                            <option value="access">Доступ</option>
                            <option value="encryption">Шифрование</option>
                            <option value="audit">Аудит</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Статус</label>
                        <select value={status} onChange={handleStatusFilterChange}>
                            <option value="">Все</option>
                            <option value="active">Активные</option>
                            <option value="inactive">Неактивные</option>
                            <option value="draft">Черновики</option>
                            <option value="archived">Архив</option>
                        </select>
                    </div>

                    <div className={styles.filterGroup}>
                        <label>Приоритет</label>
                        <select value={priority} onChange={handlePriorityChange}>
                            <option value="">Все</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
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
                        Всего политик
                    </div>
                    <div className={styles.statValue}>{stats?.total || 0}</div>
                    <div className={styles.statDetail}>активных: {stats?.active || 0}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        Активных
                    </div>
                    <div className={styles.statValue}>{stats?.active || 0}</div>
                    <div className={styles.statDetail}>
                        {Math.round((stats?.active || 0) / (stats?.total || 1) * 100)}% от всех
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        Черновиков
                    </div>
                    <div className={styles.statValue}>{stats?.draft || 0}</div>
                    <div className={styles.statDetail}>требуют публикации</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        Критичных
                    </div>
                    <div className={styles.statValue}>{stats?.byPriority?.critical || 0}</div>
                    <div className={styles.statDetail}>высокий приоритет</div>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.tableHeader}>
                    <h3>Список политик</h3>
                    <div className={styles.tableActions}>
                        <button>📥 Экспорт</button>
                        <button>📋 Выбрать все</button>
                    </div>
                </div>

                <PoliciesTable
                    data={data?.items}
                    isLoading={isLoading}
                    onPageChange={setPage}
                    totalPages={data?.totalPages}
                    currentPage={page}
                    onEdit={handleEditPolicy}
                    onDelete={handleDelete}
                    onExecute={handleExecute}
                    onStatusChange={handlePolicyStatusChange}
                />
            </div>
        </div>
    )
}