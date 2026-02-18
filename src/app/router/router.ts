import {Router, Route, RootRoute} from "@tanstack/react-router"
import {DashboardPage} from "@pages/dashboard"
import {ThreatsPage} from "@pages/threats"
import {TrafficPage} from "@pages/traffic"
import {PoliciesPage} from "@pages/policies"
import {RootLayout} from "./RootLayout"
import {AnomaliesPage} from "@pages/anomalies"
import {AuthLogsPage} from "@pages/auth-logs"
import {DiagnosticsPage} from "@pages/diagnostics"
import { ReportsPage } from "@pages/reports"
import { LogsPage } from "@pages/logs"
import { SettingsPage } from "@pages/settings"

const rootRoute = new RootRoute({
    component: RootLayout,
})

const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: DashboardPage,
})

const threatsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/threats',
    component: ThreatsPage,
})

const policiesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/policies',
    component: PoliciesPage,
})

const trafficRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/traffic',
    component: TrafficPage,
})

const anomaliesRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/anomalies',
    component: AnomaliesPage,
})

const authLogsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/auth-logs',
    component: AuthLogsPage,
})

const diagnosticsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/diagnostics',
    component: DiagnosticsPage,
})

const reportsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/reports',
    component: ReportsPage,
})

const logsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/logs',
    component: LogsPage,
})

const settingsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/settings',
    component: SettingsPage,
})

const routeTree = rootRoute.addChildren([
    dashboardRoute,
    threatsRoute,
    policiesRoute,
    trafficRoute,
    anomaliesRoute,
    authLogsRoute,
    diagnosticsRoute,
    reportsRoute,
    logsRoute,
    settingsRoute,
])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}