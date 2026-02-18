export type TrafficDirection = 'inbound' | 'outbound' | 'internal'
export type TrafficProtocol = 'TCP' | 'UDP' | 'ICMP' | 'HTTP' | 'HTTPS' | 'DNS' | 'SSH' | 'FTP' | 'SMTP'
export type TrafficStatus = 'allowed' | 'blocked' | 'suspicious' | 'monitored'

export interface TrafficFlow {
    id: string
    sourceIp: string
    sourcePort?: number
    destinationIp: string
    destinationPort?: number
    protocol: TrafficProtocol
    direction: TrafficDirection
    bytes: number
    packets: number
    duration: number
    startTime: string
    endTime: string
    status: TrafficStatus
    application?: string
    tags: string[]
    country?: string
    city?: string
    isEncrypted: boolean
}

export interface TrafficStats {
    totalBytes: number
    totalPackets: number
    totalFlows: number
    inboundBytes: number
    outboundBytes: number
    internalBytes: number
    activeConnections: number
    topProtocols: Array<{ protocol: string; bytes: number; percentage: number }>
    topSources: Array<{ ip: string; bytes: number; flows: number }>
    topDestinations: Array<{ ip: string; bytes: number; flows: number }>
    bandwidthUsage: Array<{ time: string; inbound: number; outbound: number }>
}

export interface TrafficQueryParams {
    page?: number
    limit?: number
    startTime?: string
    endTime?: string
    sourceIp?: string
    destinationIp?: string
    protocol?: TrafficProtocol
    direction?: TrafficDirection
    status?: TrafficStatus
    minBytes?: number
    maxBytes?: number
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export interface TrafficResponse {
    items: TrafficFlow[]
    total: number
    page: number
    limit: number
    totalPages: number
    stats: TrafficStats
}

export interface BandwidthData {
    time: string
    inbound: number
    outbound: number
    total?: number
}

export interface ProtocolDistribution {
    protocol: string
    bytes: number
    packets: number
    flows: number
}