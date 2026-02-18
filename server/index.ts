import app from "./app"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50))
    console.log(` Server is running on http://localhost:${PORT}`)
    console.log(' Available endpoints:')
    console.log(`   GET  http://localhost:${PORT}/health`)
    console.log(`   GET  http://localhost:${PORT}/api/dashboard/stats`)
    console.log(`   GET  http://localhost:${PORT}/api/threats`)
    console.log(`   GET  http://localhost:${PORT}/api/policies`)
    console.log(`   GET  http://localhost:${PORT}/api/traffic`)
    console.log(`   GET  http://localhost:${PORT}/api/anomalies`)
    console.log(`   GET  http://localhost:${PORT}/api/auth-logs`)
    console.log(`   GET  http://localhost:${PORT}/api/diagnostics/services`)
    console.log(`   GET  http://localhost:${PORT}/api/diagnostics/metrics`)
    console.log(`   GET  http://localhost:${PORT}/api/diagnostics/logs`)
    console.log(`   GET  http://localhost:${PORT}/api/reports`)
    console.log(`   GET  http://localhost:${PORT}/api/reports/templates`)
    console.log(`   GET  http://localhost:${PORT}/api/reports/schedules`)
    console.log(`   GET  http://localhost:${PORT}/api/settings/profile`)
    console.log(`   GET  http://localhost:${PORT}/api/settings/preferences`)
    console.log(`   GET  http://localhost:${PORT}/api/settings/security`)
    console.log(`   GET  http://localhost:${PORT}/api/settings/api-keys`)
    console.log(`   GET  http://localhost:${PORT}/api/settings/audit-logs`)
    console.log('='.repeat(50) + '\n')
})