import React from "react"
import {Outlet} from "@tanstack/react-router"
import {Sidebar} from "@widgets/sidebar/ui/Sidebar.tsx";
import {Header} from "@widgets/header/ui/Header.tsx"
import styles from "./RootLayout.module.scss"

export const RootLayout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.main}>
                <Header />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}