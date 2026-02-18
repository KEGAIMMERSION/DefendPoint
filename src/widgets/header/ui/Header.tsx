import React from "react"
import {format} from "date-fns"
import {ru} from "date-fns/locale"
import styles from "./Header.module.scss"

export const Header: React.FC = () => {
    const currentDate = format(new Date(), 'dd MMMM, EEE', { locale: ru })
    const [day, month, weekday] = currentDate.split(' ')

    return (
        <header className={styles.header}>
            <div className={styles.search}>
                <input type="text" placeholder="Поиск угроз, IP, хостов..." />
            </div>

            <div className={styles.actions}>
                <div className={styles.date}>
                    <span className={styles.day}>{day}</span>
                    <span>{month}</span>
                    <span>{weekday}</span>
                </div>

                <div className={styles.notifications}>
                    <span className={styles.icon}>🔔</span>
                    <span className={styles.badge}>3</span>
                </div>

                <div className={styles.profile}>
                    <div className={styles.avatar}>AD</div>
                    <span className={styles.name}>Admin</span>
                </div>
            </div>
        </header>
    )
}