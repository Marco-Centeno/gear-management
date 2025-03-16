import type { ReactNode } from "react"
import styles from "./component-card.module.css"

interface ComponentCardProps {
  title: string
  description: string
  children: ReactNode
}

export function ComponentCard({ title, description, children }: ComponentCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

