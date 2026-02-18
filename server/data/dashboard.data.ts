export const dashboardStats = {
    totalEvents: 1250000,
    criticalThreats: 24,
    uniqueIPs: 1500,
    averageRisk: 4.2,
    revenue: 588250.00,
    topOrders: [
        { name: 'Net Income', value: 350032, change: 16.4, today: 2680 },
        { name: 'Top Sales', value: 58850, change: 12.4, today: 2680 },
        { name: 'Top Customers', value: 210587, change: -12, today: 2680 },
        { name: 'Customer Rate', value: 86.59, change: 22.4, today: 2680, suffix: '%' },
    ]
}

export const trafficData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Total Revenue',
            data: [45000, 52000, 49000, 58000, 65000, 72000, 81000, 89000, 95000, 102000, 115000, 125000],
            borderColor: '#3b82f6',
        }
    ]
}