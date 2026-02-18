export function applyFilters<T extends Record<string, any>>(
    items: T[],
    filters: Record<string, any>
): T[] {
    return items.filter(item => {
        for (const [key, value] of Object.entries(filters)) {
            if (value === undefined || value === null) continue

            if (key === 'search' && typeof value === 'string') {
                const searchLower = value.toLowerCase()
                return Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchLower)
                )
            }

            if (item[key] !== value) return false
        }
        return true
    })
}