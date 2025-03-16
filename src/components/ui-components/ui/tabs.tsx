"use client"

import { useState, useEffect, type ReactNode } from "react"
import "./tabs.css"

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  defaultTab: string
  children: ReactNode
  className?: string
}

export default function Tabs({ tabs, defaultTab, children, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    // Hide all tab content
    const tabContents = document.querySelectorAll("[id]")
    tabContents.forEach((content) => {
      if (tabs.some((tab) => tab.id === content.id)) {
        content.classList.remove("tab-content-active")
      }
    })

    // Show active tab content
    const activeContent = document.getElementById(activeTab)
    if (activeContent) {
      activeContent.classList.add("tab-content-active")
    }
  }, [activeTab, tabs])

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">{children}</div>
    </div>
  )
}

