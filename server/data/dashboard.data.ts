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

export const dashboardCharts = {
    threatsByType: [
        { name: 'Malware', value: 45, color: '#ef4444' },
        { name: 'Phishing', value: 28, color: '#f97316' },
        { name: 'DDoS', value: 15, color: '#f59e0b' },
        { name: 'Brute Force', value: 8, color: '#3b82f6' },
        { name: 'Other', value: 4, color: '#8b5cf6' },
    ],

    hourlyActivity: [
        { hour: '00-04', count: 12 },
        { hour: '04-08', count: 8 },
        { hour: '08-12', count: 24 },
        { hour: '12-16', count: 32 },
        { hour: '16-20', count: 28 },
        { hour: '20-24', count: 18 },
    ],

    topAttackers: [
        { ip: '185.165.29.101', attacks: 1245, country: 'RU' },
        { ip: '103.95.97.42', attacks: 987, country: 'CN' },
        { ip: '45.143.221.15', attacks: 756, country: 'NL' },
        { ip: '197.210.84.33', attacks: 543, country: 'NG' },
        { ip: '91.234.176.89', attacks: 321, country: 'UA' },
    ],

    reminders: [
        { id: 1, title: 'Проверить новые политики', priority: 'high', due: '2 часа' },
        { id: 2, title: 'Обновить правила IDS', priority: 'medium', due: '1 день' },
        { id: 3, title: 'Анализ аномалий за неделю', priority: 'low', due: '3 дня' },
        { id: 4, title: 'Проверить отчет по безопасности', priority: 'high', due: 'Сегодня' },
    ]
}