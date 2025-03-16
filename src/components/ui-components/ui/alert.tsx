import type { ReactNode } from "react"
import "./alert.css"

interface AlertProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"
  className?: string
}

export default function Alert({ children, variant = "primary", className = "" }: AlertProps) {
  return <div className={`alert alert-${variant} ${className}`}>{children}</div>
}

