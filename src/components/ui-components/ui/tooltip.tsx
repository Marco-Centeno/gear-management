"use client"

import { type ReactNode, useState, useRef, useEffect, createContext } from "react"
import "./tooltip.css"

// Create a context for tooltips
const TooltipContext = createContext(null)

export function TooltipProvider({ children }: { children: ReactNode }) {
  return <TooltipContext.Provider value={null}>{children}</TooltipContext.Provider>
}

interface TooltipProps {
  children: ReactNode
  content: string
  position?: "top" | "right" | "bottom" | "left"
  className?: string
}

export default function Tooltip({ children, content, position = "top", className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const showTooltip = () => setIsVisible(true)
  const hideTooltip = () => setIsVisible(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        triggerRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        hideTooltip()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const tooltipClassNames = ["tooltip", `tooltip-${position}`, isVisible ? "tooltip-visible" : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="tooltip-wrapper">
      <div
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>
      <div ref={tooltipRef} className={tooltipClassNames} role="tooltip">
        {content}
      </div>
    </div>
  )
}

