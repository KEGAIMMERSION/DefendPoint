import React, {useState} from "react"
import {
    useGetReportsQuery,
    useGetReportsSummaryQuery,
    useGetTemplatesQuery,
    useCreateReportMutation,
    useCancelReportMutation,
    useDeleteReportMutation,
    useDeleteTemplateMutation,
} from "@entities/reports/api/reportsApi"
import styles from "./ReportsPage.module.scss"

export const ReportsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'reports' | 'templates' | 'schedules'>('reports')
    const [reportsPage, setReportsPage] = useState(1)
    const [templatesPage, setTemplatesPage] = useState(1)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const { data: reports, isLoading: reportsLoading } = useGetReportsQuery({
        page: reportsPage,
        limit: 10,
        type: typeFilter || undefined,
        status: statusFilter || undefined,
        search: search || undefined,
    })

    const { data: summary } = useGetReportsSummaryQuery()

    const { data: templates } = useGetTemplatesQuery({
        page: templatesPage,
        limit: 10,
        type: typeFilter || undefined,
        search: search || undefined,
    })

    const [createReport] = useCreateReportMutation()
    const [cancelReport] = useCancelReportMutation()
    const [deleteReport] = useDeleteReportMutation()
    const [deleteTemplate] = useDeleteTemplateMutation()  // Только удаление шаблонов

    const formatBytes = (bytes?: number): string => {
        if (!bytes) return '0 B'
        const units = ['B', 'KB', 'MB', 'GB']
        let size = bytes
        let unitIndex = 0
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024
            unitIndex++
        }
        return `${size.toFixed(1)} ${units[unitIndex]}`
    }

    const handleCreateReport = async () => {
        const name = prompt('Введите название отчета:')
        if (!name) return

        await createReport({
            name,
            description: 'Новый отчет',
            type: 'custom',
            format: 'pdf',
            dateRange: {
                start: new Date(Date.now() - 30 * 86400000).toISOString(),
                end: new Date().toISOString(),
            },
            tags: [],
        })
    }

    const handleUseTemplate = (templateId: string) => {
        console.log('Use template:', templateId)
    }

    const handleDownload = (url?: string) => {
        if (url) {
            window.open(url, '_blank')
        }
    }

    const handleCancel = async (id: string) => {
        if (confirm('Отменить генерацию отчета?')) {
            await cancelReport(id)
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm('Удалить отчет?')) {
            await deleteReport(id)
        }
    }

    const handleDeleteTemplate = async (id: string) => {
        if (confirm('Удалить шаблон?')) {
            await deleteTemplate(id)
        }
    }

    if (reportsLoading) {
        return <div className={styles.loading}>Загрузка отчетов...</div>
    }

    return (
        <div className={styles.reportsPage}>
            <h1 className={styles.pageTitle}>Отчеты</h1>
            <p className={styles.pageSubtitle}>Генерация и управление отчетами</p>

            <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Всего отчетов</div>
                    <div className={styles.summaryValue}>{summary?.total || 0}</div>
                    <div className={styles.summaryDetail}>
                        <span className={styles.success}>✓ {summary?.completed}</span>
                        <span className={styles.warning}>⏳ {summary?.generating}</span>
                        <span className={styles.danger}>✗ {summary?.failed}</span>
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Использовано места</div>
                    <div className={styles.summaryValue}>{formatBytes(summary?.storageUsed)}</div>
                    <div className={styles.summaryDetail}>
                        <span>всего отчетов</span>
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>По расписанию</div>
                    <div className={styles.summaryValue}>{summary?.scheduledCount || 0}</div>
                    <div className={styles.summaryDetail}>
                        <span>активных расписаний</span>
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>По типам</div>
                    <div className={styles.summaryValue}>
                        {summary?.byType ? Object.keys(summary.byType).length : 0}
                    </div>
                    <div className={styles.summaryDetail}>
                        <span>разных типов</span>
                    </div>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'reports' ? styles.active : ''}`}
                    onClick={() => setActiveTab('reports')}
                >
                    Отчеты
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'templates' ? styles.active : ''}`}
                    onClick={() => setActiveTab('templates')}
                >
                    Шаблоны
                </button>
            </div>

            <div className={styles.filtersBar}>
                <input
                    type="text"
                    placeholder="Поиск отчетов..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="">Все типы</option>
                    <option value="security">Безопасность</option>
                    <option value="compliance">Комплаенс</option>
                    <option value="audit">Аудит</option>
                    <option value="performance">Производительность</option>
                    <option value="custom">Пользовательские</option>
                </select>
                {activeTab === 'reports' && (
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">Все статусы</option>
                        <option value="completed">Завершены</option>
                        <option value="generating">Генерируются</option>
                        <option value="failed">Ошибки</option>
                        <option value="cancelled">Отменены</option>
                    </select>
                )}
                <button className={styles.createButton} onClick={handleCreateReport}>
                    + Новый отчет
                </button>
            </div>

            {activeTab === 'reports' && (
                <div className={styles.reportsTable}>
                    <table>
                        <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Формат</th>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th>Размер</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reports?.items.map(report => (
                            <tr key={report.id}>
                                <td>
                                    <div className={styles.reportName}>{report.name}</div>
                                    <div className={styles.reportDesc}>{report.description}</div>
                                    <div className={styles.reportTags}>
                                        {report.tags.map(tag => (
                                            <span key={tag} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                        <span className={`${styles.reportType} ${styles[report.type]}`}>
                                            {report.type}
                                        </span>
                                </td>
                                <td>
                                    <span className={styles.reportFormat}>{report.format}</span>
                                </td>
                                <td>
                                        <span className={`${styles.reportStatus} ${styles[report.status]}`}>
                                            {report.status === 'completed' ? 'Завершен' :
                                                report.status === 'generating' ? 'Генерация' :
                                                    report.status === 'failed' ? 'Ошибка' : 'Отменен'}
                                        </span>
                                </td>
                                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                                <td>{formatBytes(report.size)}</td>
                                <td>
                                    <div className={styles.reportActions}>
                                        {report.status === 'completed' && report.url && (
                                            <button
                                                className={styles.download}
                                                onClick={() => handleDownload(report.url)}
                                            >
                                                Скачать
                                            </button>
                                        )}
                                        {report.status === 'generating' && (
                                            <button
                                                className={styles.cancel}
                                                onClick={() => handleCancel(report.id)}
                                            >
                                                Отменить
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(report.id)}>
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {reports && reports.totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => setReportsPage(p => p - 1)}
                                disabled={reportsPage === 1}
                            >
                                ←
                            </button>
                            <span>{reportsPage} / {reports.totalPages}</span>
                            <button
                                onClick={() => setReportsPage(p => p + 1)}
                                disabled={reportsPage === reports.totalPages}
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'templates' && (
                <div className={styles.templatesSection}>
                    <div className={styles.sectionTitle}>Шаблоны отчетов</div>
                    <div className={styles.templatesGrid}>
                        {templates?.items.map(template => (
                            <div key={template.id} className={styles.templateCard}>
                                <div className={styles.templateHeader}>
                                    <h4>{template.name}</h4>
                                    {template.isSystem && (
                                        <span className={styles.systemBadge}>Системный</span>
                                    )}
                                </div>
                                <div className={styles.templateDesc}>{template.description}</div>
                                <div className={styles.templateMeta}>
                                    <span className={styles.type}>{template.type}</span>
                                    <span className={styles.format}>{template.format}</span>
                                </div>
                                <div className={styles.templateActions}>
                                    <button onClick={() => handleUseTemplate(template.id)}>
                                        Использовать
                                    </button>
                                    {!template.isSystem && (
                                        <button onClick={() => handleDeleteTemplate(template.id)}>
                                            Удалить
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {templates && templates.totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => setTemplatesPage(p => p - 1)}
                                disabled={templatesPage === 1}
                            >
                                ←
                            </button>
                            <span>{templatesPage} / {templates.totalPages}</span>
                            <button
                                onClick={() => setTemplatesPage(p => p + 1)}
                                disabled={templatesPage === templates.totalPages}
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}