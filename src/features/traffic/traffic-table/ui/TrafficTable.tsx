import React from "react"
import type {TrafficFlow} from "@entities/traffic/model/types.ts"
import styles from "./TrafficTable.module.scss"

interface TrafficTableProps {
    data?: TrafficFlow[]
    isLoading?: boolean
    onPageChange?: (page: number) => void
    totalPages?: number
    currentPage?: number
    onBlock?: (id: string) => void
    onAllow?: (id: string) => void
    onViewDetails?: (id: string) => void
}

export const TrafficTable: React.FC<TrafficTableProps> = ({data = [], isLoading, onPageChange, totalPages = 1, currentPage = 1, onBlock, onAllow, onViewDetails,}) => {
    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
    }

    const formatDuration = (seconds: number): string => {
        if (seconds < 60) return `${seconds}с`
        if (seconds < 3600) return `${Math.floor(seconds / 60)}м ${seconds % 60}с`
        return `${Math.floor(seconds / 3600)}ч ${Math.floor((seconds % 3600) / 60)}м`
    }

    const getProtocolClass = (protocol: string): string => {
        const p = protocol.toLowerCase()
        if (p === 'tcp') return styles.tcp
        if (p === 'udp') return styles.udp
        if (p === 'icmp') return styles.icmp
        if (p === 'http' || p === 'https') return styles.http
        if (p === 'dns') return styles.dns
        return ''
    }

    const getStatusClass = (status: string): string => {
        switch (status) {
            case 'allowed': return styles.allowed
            case 'blocked': return styles.blocked
            case 'suspicious': return styles.suspicious
            case 'monitored': return styles.monitored
            default: return ''
        }
    }

    const getDirectionClass = (direction: string): string => {
        switch (direction) {
            case 'inbound': return styles.inbound
            case 'outbound': return styles.outbound
            case 'internal': return styles.internal
            default: return ''
        }
    }

    const getDirectionArrow = (direction: string): string => {
        switch (direction) {
            case 'inbound': return '↓'
            case 'outbound': return '↑'
            case 'internal': return '↔'
            default: return '→'
        }
    }

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <span>Загрузка данных трафика...</span>
            </div>
        )
    }

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyIcon}>🌐</div>
                <p>Данные трафика не найдены</p>
            </div>
        )
    }

    return (
        <div className={styles.table}>
            <table>
                <thead>
                <tr>
                    <th>Время</th>
                    <th>Источник</th>
                    <th>Назначение</th>
                    <th>Протокол</th>
                    <th>Направление</th>
                    <th>Размер</th>
                    <th>Длительность</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {data.map((flow) => (
                    <tr key={flow.id}>
                        <td>
                            <div className={styles.time}>
                                {new Date(flow.startTime).toLocaleTimeString()}
                                <span className={styles.date}>
                    {new Date(flow.startTime).toLocaleDateString()}
                  </span>
                            </div>
                        </td>
                        <td>
                            <div className={styles.ipAddress}>
                                {flow.sourceIp}
                                {flow.sourcePort && (
                                    <span className={styles.port}>:{flow.sourcePort}</span>
                                )}
                            </div>
                            {flow.country && (
                                <div className={styles.location}>
                                    {flow.country} {flow.city && `, ${flow.city}`}
                                </div>
                            )}
                        </td>
                        <td>
                            <div className={styles.ipAddress}>
                                {flow.destinationIp}
                                {flow.destinationPort && (
                                    <span className={styles.port}>:{flow.destinationPort}</span>
                                )}
                            </div>
                        </td>
                        <td>
                <span className={`${styles.protocol} ${getProtocolClass(flow.protocol)}`}>
                  {flow.protocol}
                </span>
                        </td>
                        <td>
                            <div className={`${styles.direction} ${getDirectionClass(flow.direction)}`}>
                                <span className={styles.arrow}>{getDirectionArrow(flow.direction)}</span>
                                {flow.direction === 'inbound' ? 'Входящий' :
                                    flow.direction === 'outbound' ? 'Исходящий' : 'Внутренний'}
                            </div>
                        </td>
                        <td>
                            <div className={styles.bytes}>
                                {formatBytes(flow.bytes)}
                                <span className={styles.packets}>
                    {flow.packets} пак.
                  </span>
                            </div>
                        </td>
                        <td>{formatDuration(flow.duration)}</td>
                        <td>
                <span className={`${styles.status} ${getStatusClass(flow.status)}`}>
                  {flow.status === 'allowed' ? 'Разрешено' :
                      flow.status === 'blocked' ? 'Заблокировано' :
                          flow.status === 'suspicious' ? 'Подозрительно' : 'Мониторинг'}
                </span>
                        </td>
                        <td>
                            <div className={styles.actions}>
                                <button
                                    onClick={() => onViewDetails?.(flow.id)}
                                    title="Детали"
                                >
                                    👁️
                                </button>
                                {flow.status !== 'blocked' && (
                                    <button
                                        className={styles.block}
                                        onClick={() => onBlock?.(flow.id)}
                                        title="Заблокировать"
                                    >
                                        🚫
                                    </button>
                                )}
                                {flow.status === 'blocked' && (
                                    <button
                                        className={styles.allow}
                                        onClick={() => onAllow?.(flow.id)}
                                        title="Разрешить"
                                    >
                                        ✅
                                    </button>
                                )}
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