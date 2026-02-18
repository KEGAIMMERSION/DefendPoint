import {policies, policyStats} from "../data/policies.data"
import {PaginationQuery} from "../types"
import {applyPagination, applyFilters} from "../utils"

export class PoliciesService {
    getPolicies(query: PaginationQuery & {
        type?: string
        status?: string
        priority?: string
        search?: string
    }) {
        let filtered = [...policies]

        if (query.type) {
            filtered = filtered.filter(p => p.type === query.type)
        }
        if (query.status) {
            filtered = filtered.filter(p => p.status === query.status)
        }
        if (query.priority) {
            filtered = filtered.filter(p => p.priority === query.priority)
        }
        if (query.search) {
            const searchLower = query.search.toLowerCase()
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            )
        }

        return applyPagination(filtered, query)
    }

    getPolicyById(id: string) {
        return policies.find(p => p.id === id)
    }

    getStats() {
        return policyStats
    }

    createPolicy(data: any) {
        const newPolicy = {
            id: String(policies.length + 1),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1
        }
        policies.push(newPolicy)
        return newPolicy
    }

    updatePolicy(id: string, data: any) {
        const index = policies.findIndex(p => p.id === id)
        if (index === -1) return null

        policies[index] = {
            ...policies[index],
            ...data,
            updatedAt: new Date().toISOString(),
            version: policies[index].version + 1
        }
        return policies[index]
    }

    updatePolicyStatus(id: string, status: string) {
        const policy = policies.find(p => p.id === id)
        if (!policy) return null

        policy.status = status as any
        policy.updatedAt = new Date().toISOString()
        return policy
    }

    deletePolicy(id: string) {
        const index = policies.findIndex(p => p.id === id)
        if (index === -1) return false

        policies.splice(index, 1)
        return true
    }

    executePolicy(id: string) {
        const policy = policies.find(p => p.id === id)
        if (!policy) return null

        policy.lastExecuted = new Date().toISOString()
        return policy
    }
}