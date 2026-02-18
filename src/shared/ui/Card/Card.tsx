import React from "react"
import clsx from "clsx"
import styles from "./Card.module.scss"

interface CardProps {
    title: string
    value: string | number
    change?: number
    changeLabel?: string
    suffix?: string
    className?: string
}

export const Card: React.FC<CardProps> = ({title, value, change, changeLabel, suffix, className}) => {
    const isPositive = change && change > 0

    return (
        <div className={clsx(styles.card, className)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.value}>
                {value}
                {suffix}
            </div>
            {change !== undefined && (
                <div className={styles.change}>
          <span className={isPositive ? styles.positive : styles.negative}>
            {isPositive ? '+' : ''}{change}%
          </span>
                    {changeLabel && <span> {changeLabel}</span>}
                </div>
            )}
        </div>
    )
}