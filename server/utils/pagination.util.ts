import {PaginationQuery, PaginatedResponse} from "../types"

export function applyPagination<T>(
    items: T[],
    query: PaginationQuery
): PaginatedResponse<T> {
    const page = query.page || 1
    const limit = query.limit || 10
    const start = (page - 1) * limit
    const end = start + limit

    return {
        items: items.slice(start, end),
        total: items.length,
        page,
        limit,
        totalPages: Math.ceil(items.length / limit)
    }
}