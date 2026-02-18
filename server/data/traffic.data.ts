export const trafficFlows = [
    {
        id: '1',
        sourceIp: '192.168.1.100',
        sourcePort: 54321,
        destinationIp: '10.0.0.45',
        destinationPort: 443,
        protocol: 'TCP',
        direction: 'outbound',
        bytes: 1520000,
        packets: 1250,
        duration: 45,
        startTime: new Date(Date.now() - 3600000).toISOString(),
        endTime: new Date().toISOString(),
        status: 'allowed',
        application: 'HTTPS',
        tags: ['web', 'encrypted'],
        country: 'US',
        city: 'New York',
        isEncrypted: true
    },
    {
        id: '2',
        sourceIp: '10.0.0.23',
        sourcePort: 53,
        destinationIp: '192.168.1.50',
        destinationPort: 53,
        protocol: 'UDP',
        direction: 'inbound',
        bytes: 4500,
        packets: 15,
        duration: 0.5,
        startTime: new Date(Date.now() - 1800000).toISOString(),
        endTime: new Date(Date.now() - 1799500).toISOString(),
        status: 'allowed',
        application: 'DNS',
        tags: ['dns'],
        country: 'US',
        city: 'San Francisco',
        isEncrypted: false
    }
]

export const trafficStats = {
    totalBytes: 1572500000,
    totalPackets: 8450000,
    totalFlows: trafficFlows.length,
    inboundBytes: 892500000,
    outboundBytes: 680000000,
    internalBytes: 245000,
    activeConnections: 3,
    topProtocols: [
        { protocol: 'TCP', bytes: 1452000, percentage: 72 },
        { protocol: 'UDP', bytes: 4500, percentage: 0.2 },
        { protocol: 'ICMP', bytes: 1200, percentage: 0.1 }
    ],
    bandwidthUsage: [
        { time: '00:00', inbound: 45000, outbound: 38000 },
        { time: '01:00', inbound: 42000, outbound: 35000 },
        { time: '02:00', inbound: 38000, outbound: 32000 }
    ]
}