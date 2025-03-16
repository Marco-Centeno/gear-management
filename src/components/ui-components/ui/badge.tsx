import type { ReactNode } from "react"
import "./badge.css"

interface BadgeProps {
  children: ReactNode
  variant?: "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"
  pill?: boolean
  rounded?: boolean
  className?: string
}

export default function Badge({
  children,
  variant = "default",
  pill = false,
  rounded = false,
  className = "",
}: BadgeProps) {
  const classNames = ["badge", `badge-${variant}`, pill ? "badge-pill" : "", rounded ? "badge-rounded" : "", className]
    .filter(Boolean)
    .join(" ")

  return <span className={classNames}>{children}</span>
}

