import type { ReactNode } from "react"
import styles from "./alert.module.css"

interface AlertProps {
  children: ReactNode
  variant?: "default" | "destructive"
  className?: string
}

export function Alert({ children, variant = "default", className = "" }: AlertProps) {
  return <div className={`${styles.alert} ${styles[variant]} ${className}`}>{children}</div>
}

