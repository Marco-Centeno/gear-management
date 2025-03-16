"use client"

import { type ReactNode, useState, useRef, useEffect } from "react"
import "./dropdown.css"

interface DropdownItem {
  label: string
  onClick: () => void
  disabled?: boolean
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  position?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  className?: string
}

export default function Dropdown({ trigger, items, position = "bottom-start", className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const dropdownClassNames = ["dropdown", className].filter(Boolean).join(" ")

  const menuClassNames = ["dropdown-menu", `dropdown-${position}`, isOpen ? "dropdown-menu-open" : ""]
    .filter(Boolean)
    .join(" ")

  return (
    <div ref={dropdownRef} className={dropdownClassNames}>
      <div className="dropdown-trigger" onClick={toggleDropdown}>
        {trigger}
      </div>
      <div className={menuClassNames}>
        {items.map((item, index) => (
          <button
            key={index}
            className="dropdown-item"
            onClick={() => {
              item.onClick()
              setIsOpen(false)
            }}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

