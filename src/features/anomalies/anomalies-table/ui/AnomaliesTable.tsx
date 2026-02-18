import React from "react"
import type {Anomaly} from "@entities/anomalies/model/types.ts"
import styles from "./AnomaliesTable.module.scss"

interface AnomaliesTableProps {
    data?: Anomaly[]
    isLoading?: boolean
    onPageChange?: (page: number) => void
    totalPages?: number
    currentPage?: number
    onStatusChange?: (id: string, status: Anomaly['status']) => void
    onAssign?: (id: string) => void
    onResolve?: (id: string) => void
    onViewDetails?: (id: string) => void
}

export const AnomaliesTable: React.FC<AnomaliesTableProps> = ({data = [], isLoading, onPageChange, totalPages = 1, currentPage = 1, onStatusChange, onAssign, onResolve, onViewDetails}) => {
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
            case 'new': return styles.new
            case 'investigating': return styles.investigating
            case 'resolved': return styles.resolved
            case 'ignored': return styles.ignored
            default: return ''
        }
    }

    const getTypeClass = (type: string): string => {
        switch (type) {
            case 'traffic': return styles.traffic
            case 'behavior': return styles.behavior
            case 'performance': return styles.performance
            case 'security': return styles.security
            case 'compliance': return styles.compliance
            default: return ''
        }
    }

    const getTypeLabel = (type: string): string => {
        switch (type) {
            case 'traffic': return 'Трафик'
            case 'behavior': return 'Поведение'
            case 'performance': return 'Производительность'
            case 'security': return 'Безопасность'
            case 'compliance': return 'Комплаенс'
            default: return type
        }
    }

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'new': return 'Новая'
            case 'investigating': return 'Расследование'
            case 'resolved': return 'Решена'
            case 'ignored': return 'Игнорируется'
            default: return status
        }
    }

    const getConfidenceClass = (confidence: number): string => {
        if (confidence >= 80) return styles.high
        if (confidence >= 50) return styles.medium
        return styles.low
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

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <span>Загрузка аномалий...</span>
            </div>
        )
    }

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>🔍</div>
                <p>Аномалии не найдены</p>
            </div>
        )
    }

    return (
        <div className={styles.table}>
            <table>
                <thead>
                <tr>
                    <th>Время</th>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Источник</th>
                    <th>Критичность</th>
                    <th>Статус</th>
                    <th>Значение</th>
                    <th>Уверенность</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {data.map((anomaly) => (
                    <tr key={anomaly.id} className={anomaly.status === 'new' ? styles.new : ''}>
                        <td>{formatDateTime(anomaly.timestamp)}</td>
                        <td>
                            <div className={styles.name}>
                                <strong>{anomaly.name}</strong>
                                {anomaly.tags && anomaly.tags.length > 0 && (
                                    <div className={styles.tags}>
                                        {anomaly.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                        {anomaly.tags.length > 2 && (
                                            <span className={styles.tag}>+{anomaly.tags.length - 2}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </td>
                        <td>
                <span className={`${styles.type} ${getTypeClass(anomaly.type)}`}>
                  {getTypeLabel(anomaly.type)}
                </span>
                        </td>
                        <td>{anomaly.source}</td>
                        <td>
                <span className={`${styles.severity} ${getSeverityClass(anomaly.severity)}`}>
                  {anomaly.severity}
                </span>
                        </td>
                        <td>
                <span className={`${styles.status} ${getStatusClass(anomaly.status)}`}>
                  {getStatusLabel(anomaly.status)}
                </span>
                        </td>
                        <td>
                            <div className={styles.value}>
                                {anomaly.value} {anomaly.unit}
                                <span className={styles.threshold}>
                    / {anomaly.threshold} {anomaly.unit}
                  </span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.confidence}>
                                <div className={styles.bar}>
                                    <div
                                        className={`${styles.fill} ${getConfidenceClass(anomaly.confidence)}`}
                                        style={{ width: `${anomaly.confidence}%` }}
                                    />
                                </div>
                                <span className={styles.value}>{anomaly.confidence}%</span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.actions}>
                                <button
                                    onClick={() => onViewDetails?.(anomaly.id)}
                                    title="Детали"
                                >
                                    👁️
                                </button>
                                {anomaly.status === 'new' && (
                                    <button
                                        className={styles.resolve}
                                        onClick={() => onResolve?.(anomaly.id)}
                                        title="Взять в работу"
                                    >
                                        🔍
                                    </button>
                                )}
                                {anomaly.status === 'investigating' && (
                                    <button
                                        className={styles.resolve}
                                        onClick={() => onResolve?.(anomaly.id)}
                                        title="Отметить как решённую"
                                    >
                                        ✅
                                    </button>
                                )}
                                <button
                                    className={styles.assign}
                                    onClick={() => onAssign?.(anomaly.id)}
                                    title="Назначить"
                                >
                                    👤
                                </button>
                                <select
                                    value={anomaly.status}
                                    onChange={(e) => onStatusChange?.(anomaly.id, e.target.value as Anomaly['status'])}
                                    className={styles.statusSelect}
                                >
                                    <option value="new">Новая</option>
                                    <option value="investigating">Расследование</option>
                                    <option value="resolved">Решена</option>
                                    <option value="ignored">Игнорировать</option>
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

                    <span>{currentPage} / {totalPages}</span>

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