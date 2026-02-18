import {Request} from "express"

export function getParamString(req: Request, name: string): string | undefined {
    const value = req.params[name]
    if (typeof value === 'string') return value
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
        return value[0]
    }
    return undefined
}

export function getParamId(req: Request): string | undefined {
    return getParamString(req, 'id')
}