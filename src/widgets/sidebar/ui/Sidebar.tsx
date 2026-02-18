import React from "react"
import {Link, useLocation} from "@tanstack/react-router"
import styles from "./Sidebar.module.scss"

interface NavItem {
    path: string
    label: string
}

const navItems: NavItem[] = [
    { path: '/', label: 'Главная' },
    { path: '/policies', label: 'Политики' },
    { path: '/traffic', label: 'Трафик' },
    { path: '/threats', label: 'Угрозы безопасности' },
    { path: '/anomalies', label: 'Аномалии' },
    { path: '/auth-logs', label: 'Журнал авторизации' },
    { path: '/logs', label: 'Журналы' },
    { path: '/diagnostics', label: 'Диагностика' },
    { path: '/reports', label: 'Отчеты' },
    { path: '/settings', label: 'Настройки' },
]

export const Sidebar: React.FC = () => {
    const location = useLocation()

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <h1>DefendPoint</h1>
                <span>NDR Platform</span>
            </div>

            <nav className={styles.nav}>
                <ul>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <li key={item.path} className={styles.navItem}>
                                <Link
                                    to={item.path}
                                    className={isActive ? styles.active : ''}
                                >
                                    {isActive && <span className={styles.indicator} />}
                                    {item.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className={styles.footer}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>AD</div>
                    <div className={styles.details}>
                        <div className={styles.name}>Admin User</div>
                        <div className={styles.role}>Security Analyst</div>
                    </div>
                </div>
                <button className={styles.logout}>
                    Выйти
                </button>
            </div>
        </aside>
    )
}