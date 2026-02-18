import React from "react"
import type {Policy} from "@entities/policies/model/types.ts"
import styles from "./PoliciesTable.module.scss"

interface PoliciesTableProps {
    data?: Policy[]
    isLoading?: boolean
    onPageChange?: (page: number) => void
    totalPages?: number
    currentPage?: number
    onEdit?: (policy: Policy) => void
    onDelete?: (id: string) => void
    onExecute?: (id: string) => void
    onStatusChange?: (id: string, status: Policy['status']) => void
}

export const PoliciesTable: React.FC<PoliciesTableProps> = ({data = [], isLoading, onPageChange, totalPages = 1, currentPage = 1, onEdit, onDelete, onExecute, onStatusChange,}) => {
    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <span>Загрузка политик...</span>
            </div>
        )
    }

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>📋</div>
                <p>Политики не найдены</p>
                <button>Создать политику</button>
            </div>
        )
    }

    const getTypeClass = (type: string): string => {
        switch (type) {
            case 'firewall': return styles.firewall
            case 'ids': return styles.ids
            case 'ips': return styles.ips
            case 'access': return styles.access
            case 'encryption': return styles.encryption
            case 'audit': return styles.audit
            default: return ''
        }
    }

    const getStatusClass = (status: string): string => {
        switch (status) {
            case 'active': return styles.active
            case 'inactive': return styles.inactive
            case 'draft': return styles.draft
            case 'archived': return styles.archived
            default: return ''
        }
    }

    const getPriorityClass = (priority: string): string => {
        switch (priority) {
            case 'critical': return styles.critical
            case 'high': return styles.high
            case 'medium': return styles.medium
            case 'low': return styles.low
            default: return ''
        }
    }

    const getStatusText = (status: string): string => {
        switch (status) {
            case 'active': return 'Активна'
            case 'inactive': return 'Неактивна'
            case 'draft': return 'Черновик'
            case 'archived': return 'Архив'
            default: return status
        }
    }

    const getTypeText = (type: string): string => {
        switch (type) {
            case 'firewall': return 'Firewall'
            case 'ids': return 'IDS'
            case 'ips': return 'IPS'
            case 'access': return 'Доступ'
            case 'encryption': return 'Шифрование'
            case 'audit': return 'Аудит'
            default: return type
        }
    }

    return (
        <div className={styles.table}>
            <table>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Статус</th>
                    <th>Приоритет</th>
                    <th>Правил</th>
                    <th>Версия</th>
                    <th>Обновлено</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {data.map((policy) => (
                    <tr key={policy.id}>
                        <td>
                            <div className={styles.policyName}>
                                <strong>{policy.name}</strong>
                                {policy.tags && policy.tags.length > 0 && (
                                    <div className={styles.tags}>
                                        {policy.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </td>
                        <td>
                <span className={`${styles.type} ${getTypeClass(policy.type)}`}>
                  {getTypeText(policy.type)}
                </span>
                        </td>
                        <td>
                <span className={`${styles.status} ${getStatusClass(policy.status)}`}>
                  {getStatusText(policy.status)}
                </span>
                        </td>
                        <td>
                <span className={`${styles.priority} ${getPriorityClass(policy.priority)}`}>
                  {policy.priority}
                </span>
                        </td>
                        <td>{policy.rules}</td>
                        <td>v{policy.version}</td>
                        <td>{new Date(policy.updatedAt).toLocaleDateString()}</td>
                        <td>
                            <div className={styles.actions}>
                                {policy.status === 'active' && (
                                    <button
                                        className={styles.execute}
                                        onClick={() => onExecute?.(policy.id)}
                                        title="Выполнить"
                                    >
                                        ▶
                                    </button>
                                )}
                                <button
                                    onClick={() => onEdit?.(policy)}
                                    title="Редактировать"
                                >
                                    ✏️
                                </button>
                                <button
                                    className={styles.delete}
                                    onClick={() => onDelete?.(policy.id)}
                                    title="Удалить"
                                >
                                    🗑️
                                </button>
                                <select
                                    value={policy.status}
                                    onChange={(e) => onStatusChange?.(policy.id, e.target.value as Policy['status'])}
                                    className={styles.statusSelect}
                                >
                                    <option value="active">Активна</option>
                                    <option value="inactive">Неактивна</option>
                                    <option value="draft">Черновик</option>
                                    <option value="archived">Архив</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => onPageChange?.(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ←
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange?.(page)}
                            className={page === currentPage ? styles.active : ''}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange?.(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    )
}
