import React from "react"
import type {Threat} from "@entities/threats/model/types.ts"
import styles from "./ThreatsTable.module.scss"

interface ThreatsTableProps {
    data?: Threat[]
    isLoading?: boolean
    onPageChange?: (page: number) => void
    totalPages?: number
    currentPage?: number
}

export const ThreatsTable: React.FC<ThreatsTableProps> = ({data = [], isLoading, onPageChange, totalPages = 1, currentPage = 1,}) => {
    if (isLoading) {
        return <div className={styles.loading}>Загрузка угроз...</div>
    }
    if (!Array.isArray(data) || data.length === 0) {
        return <div className={styles.empty}>Нет данных об угрозах</div>
    }

    const getSeverityClass = (severity: string): string => {
        switch (severity) {
            case 'critical': return styles.critical
            case 'high': return styles.high
            case 'medium': return styles.medium
            case 'low': return styles.low
            default: return ''
        }
    }

    const getStatusClass = (status: string): string => {
        switch (status) {
            case 'active': return styles.active
            case 'investigating': return styles.investigating
            case 'resolved': return styles.resolved
            default: return ''
        }
    }

    const getStatusText = (status: string): string => {
        switch (status) {
            case 'active': return 'Активна'
            case 'investigating': return 'Расследование'
            case 'resolved': return 'Решена'
            default: return status
        }
    }

    return (
        <div className={styles.table}>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название угрозы</th>
                    <th>Количество</th>
                    <th>Критичность</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {data.map((threat: Threat) => (
                    <tr key={threat.id}>
                        <td>{threat.id}</td>
                        <td>{threat.name}</td>
                        <td>{threat.count.toLocaleString()}</td>
                        <td>
                <span className={`${styles.severity} ${getSeverityClass(threat.severity)}`}>
                  {threat.severity}
                </span>
                        </td>
                        <td>
                <span className={`${styles.status} ${getStatusClass(threat.status)}`}>
                  {getStatusText(threat.status)}
                </span>
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