"use client"

import type React from "react"

import { useState } from "react"
import "./accordion.css"

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: string[]
  multiple?: boolean
  className?: string
}

export default function Accordion({ items, defaultOpen = [], multiple = false, className = "" }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (id: string) => {
    if (multiple) {
      setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)

        return (
          <div key={item.id} className={`accordion-item ${isOpen ? "accordion-item-open" : ""}`}>
            <button className="accordion-header" onClick={() => toggleItem(item.id)} aria-expanded={isOpen}>
              <span className="accordion-title">{item.title}</span>
              <svg
                className="accordion-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="accordion-content">
              <div className="accordion-body">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

