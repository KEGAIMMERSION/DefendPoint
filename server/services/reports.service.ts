import {reports, reportTemplates, reportSchedules, reportsSummary} from "../data/reports.data"
import {PaginationQuery} from "../types"
import {applyPagination} from "../utils"

interface ReportsQuery extends PaginationQuery {
    type?: string
    status?: string
    format?: string
    search?: string
}

interface TemplatesQuery extends PaginationQuery {
    type?: string
    isSystem?: boolean
    search?: string
}

export class ReportsService {
    getReports(query: ReportsQuery) {
        let filtered = [...reports]

        if (query.type) {
            filtered = filtered.filter(r => r.type === query.type)
        }

        if (query.status) {
            filtered = filtered.filter(r => r.status === query.status)
        }

        if (query.format) {
            filtered = filtered.filter(r => r.format === query.format)
        }

        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(r =>
                r.name.toLowerCase().includes(searchLower) ||
                r.description.toLowerCase().includes(searchLower)
            )
        }

        return applyPagination(filtered, query)
    }

    getReportById(id: string) {
        return reports.find(r => r.id === id)
    }

    getSummary() {
        return reportsSummary
    }

    createReport(data: any) {
        const newReport = {
            id: String(reports.length + 1),
            ...data,
            status: 'generating',
            createdAt: new Date().toISOString(),
            tags: data.tags || []
        }
        reports.push(newReport)

        setTimeout(() => {
            const report = reports.find(r => r.id === newReport.id)
            if (report) {
                report.status = 'completed'
                report.generatedAt = new Date().toISOString()
                report.completedAt = new Date().toISOString()
                report.size = Math.floor(Math.random() * 5000000) + 1000000
                report.url = `/reports/${report.id}.${report.format}`
            }
        }, 5000)

        return newReport
    }

    cancelReport(id: string) {
        const report = reports.find(r => r.id === id)
        if (!report) return null

        if (report.status === 'generating') {
            report.status = 'cancelled'
        }
        return report
    }

    deleteReport(id: string) {
        const index = reports.findIndex(r => r.id === id)
        if (index === -1) return false

        reports.splice(index, 1)
        return true
    }

    getTemplates(query: TemplatesQuery) {
        let filtered = [...reportTemplates]

        if (query.type) {
            filtered = filtered.filter(t => t.type === query.type)
        }

        if (query.isSystem !== undefined) {
            filtered = filtered.filter(t => t.isSystem === query.isSystem)
        }

        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(t =>
                t.name.toLowerCase().includes(searchLower) ||
                t.description.toLowerCase().includes(searchLower)
            )
        }

        return applyPagination(filtered, query)
    }

    getTemplateById(id: string) {
        return reportTemplates.find(t => t.id === id)
    }

    createTemplate(data: any) {
        const newTemplate = {
            id: String(reportTemplates.length + 1),
            ...data,
            isSystem: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        reportTemplates.push(newTemplate)
        return newTemplate
    }

    updateTemplate(id: string, data: any) {
        const index = reportTemplates.findIndex(t => t.id === id)
        if (index === -1) return null

        reportTemplates[index] = {
            ...reportTemplates[index],
            ...data,
            updatedAt: new Date().toISOString()
        }
        return reportTemplates[index]
    }

    deleteTemplate(id: string) {
        const index = reportTemplates.findIndex(t => t.id === id)
        if (index === -1) return false

        reportTemplates.splice(index, 1)
        return true
    }

    getSchedules(query: PaginationQuery) {
        return applyPagination(reportSchedules, query)
    }

    getScheduleById(id: string) {
        return reportSchedules.find(s => s.id === id)
    }

    createSchedule(data: any) {
        const newSchedule = {
            id: String(reportSchedules.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        reportSchedules.push(newSchedule)
        return newSchedule
    }

    updateSchedule(id: string, data: any) {
        const index = reportSchedules.findIndex(s => s.id === id)
        if (index === -1) return null

        reportSchedules[index] = {
            ...reportSchedules[index],
            ...data,
            updatedAt: new Date().toISOString()
        }
        return reportSchedules[index]
    }

    deleteSchedule(id: string) {
        const index = reportSchedules.findIndex(s => s.id === id)
        if (index === -1) return false

        reportSchedules.splice(index, 1)
        return true
    }

    toggleSchedule(id: string) {
        const schedule = reportSchedules.find(s => s.id === id)
        if (!schedule) return null

        schedule.isActive = !schedule.isActive
        schedule.updatedAt = new Date().toISOString()
        return schedule
    }
}