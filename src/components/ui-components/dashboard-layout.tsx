"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Sidebar } from "../ui-components/sidebar"
import { ThemeToggle } from "./theme-toggle"
import styles from "./dashboard-layout.module.css"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  // Ensure theme is applied after hydration to avoid flash
  useEffect(() => {
    setMounted(true)

    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !darkMode ? "dark" : "light"
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark", !darkMode)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <div className={`${styles.layout} ${darkMode ? styles.dark : ""}`}>
      
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerActions}>
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          </div>
        </header>
        <main className={styles.main}>{mounted && children}</main>
      </div>
    </div>
  )
}

