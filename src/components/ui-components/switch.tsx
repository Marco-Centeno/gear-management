"use client"

import { useState } from "react"
import styles from "./switch.module.css"

interface SwitchProps {
  id?: string
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function Switch({ id, defaultChecked = false, onChange, className = "" }: SwitchProps) {
  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      className={`${styles.switch} ${checked ? styles.checked : ""} ${className}`}
      onClick={handleChange}
    >
      <span className={styles.thumb} />
    </button>
  )
}

