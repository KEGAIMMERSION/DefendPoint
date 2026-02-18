import {Request} from "express"

export class RequestUtil {
    static getStringParam(req: Request, param: string): string | undefined {
        const value = req.query[param]
        if (typeof value === 'string') return value
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
            return value[0]
        }
        return undefined
    }

    static getNumberParam(req: Request, param: string): number | undefined {
        const value = this.getStringParam(req, param)
        if (value === undefined) return undefined
        const num = Number(value)
        return isNaN(num) ? undefined : num
    }

    static getBooleanParam(req: Request, param: string): boolean | undefined {
        const value = this.getStringParam(req, param)
        if (value === undefined) return undefined
        return value === 'true' || value === '1'
    }

    static getPaginationParams(req: Request) {
        return {
            page: this.getNumberParam(req, 'page'),
            limit: this.getNumberParam(req, 'limit')
        }
    }

    static getFilterParams(req: Request, exclude: string[] = ['page', 'limit']): Record<string, string | undefined> {
        const filters: Record<string, string | undefined> = {}

        Object.keys(req.query).forEach(key => {
            if (!exclude.includes(key)) {
                filters[key] = this.getStringParam(req, key)
            }
        })

        return filters
    }
}