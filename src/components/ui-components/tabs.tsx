"use client"

import { useState, useEffect, type ReactNode } from "react"
import styles from "./tabs.module.css"

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  defaultTab: string
  children: ReactNode
}

export function Tabs({ tabs, defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  useEffect(() => {
    // Hide all tab content
    const tabContents = document.querySelectorAll("[id]")
    tabContents.forEach((content) => {
      if (tabs.some((tab) => tab.id === content.id)) {
        content.classList.remove(styles.active)
      }
    })

    // Show active tab content
    const activeContent = document.getElementById(activeTab)
    if (activeContent) {
      activeContent.classList.add(styles.active)
    }
  }, [activeTab, tabs])

  return (
    <div className={styles.container}>
      <div className={styles.tabsList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabsTrigger} ${activeTab === tab.id ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabsContent}>{children}</div>
    </div>
  )
}

