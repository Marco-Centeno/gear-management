import type { ReactNode } from "react"
import styles from "./badge.module.css"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "secondary" | "outline" | "destructive"
  className?: string
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]} ${className}`}>{children}</span>
}

