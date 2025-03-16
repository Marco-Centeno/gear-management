"use client"

import { useState } from "react"
import "./switch.css"

interface SwitchProps {
  label?: string
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export default function Switch({
  label,
  defaultChecked = false,
  disabled = false,
  onChange,
  className = "",
}: SwitchProps) {
  const [checked, setChecked] = useState(defaultChecked)

  const handleChange = () => {
    if (disabled) return

    const newChecked = !checked
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  const classNames = ["switch", checked ? "switch-checked" : "", disabled ? "switch-disabled" : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="switch-wrapper">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={classNames}
        onClick={handleChange}
        disabled={disabled}
      >
        <span className="switch-thumb" />
      </button>
      {label && <span className="switch-label">{label}</span>}
    </div>
  )
}

