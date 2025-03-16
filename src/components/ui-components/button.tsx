"use client"

import type { ReactNode } from "react"
import styles from "./button.module.css"

interface ButtonProps {
  children: ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "default" | "small" | "large"
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

