import {Request} from "express"

export function getQueryString(req: Request, name: string): string | undefined {
    const value = req.query[name]

    if (value === undefined || value === null) {
        return undefined
    }

    if (typeof value === 'string') {
        return value
    }

    if (Array.isArray(value) && value.length > 0) {
        const firstItem = value[0]
        if (typeof firstItem === 'string') {
            return firstItem
        }
    }

    return undefined
}

export function getQueryNumber(req: Request, name: string): number | undefined {
    const strValue = getQueryString(req, name)

    if (strValue === undefined) {
        return undefined
    }

    const num = Number(strValue)

    if (isNaN(num) || !isFinite(num)) {
        return undefined
    }

    return num
}

export function getQueryBoolean(req: Request, name: string): boolean | undefined {
    const strValue = getQueryString(req, name)

    if (strValue === undefined) {
        return undefined
    }

    return strValue === 'true' || strValue === '1'
}