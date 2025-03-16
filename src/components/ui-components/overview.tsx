"use client"

import { useEffect, useRef } from "react"
import styles from "./overview.module.css"

const data = [
  { name: "Ene", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Abr", total: 2400 },
  { name: "May", total: 2700 },
  { name: "Jun", total: 1700 },
  { name: "Jul", total: 2900 },
  { name: "Ago", total: 3100 },
  { name: "Sep", total: 3500 },
  { name: "Oct", total: 2800 },
  { name: "Nov", total: 3200 },
  { name: "Dic", total: 3800 },
]

export function Overview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Calculate max value for scaling
    const maxValue = Math.max(...data.map((item) => item.total))

    // Chart dimensions
    const padding = 40
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2
    const barWidth = (chartWidth / data.length) * 0.6
    const barSpacing = (chartWidth / data.length) * 0.4

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border")
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, rect.height - padding)
    ctx.lineTo(rect.width - padding, rect.height - padding)
    ctx.stroke()

    // Draw bars with animation
    data.forEach((item, index) => {
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2
      const barHeight = (item.total / maxValue) * chartHeight
      const y = rect.height - padding - barHeight

      // Draw bar
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--primary")
      ctx.fillRect(x, rect.height - padding, barWidth, 0) // Start with height 0

      // Animate bar height
      let currentHeight = 0
      const targetHeight = barHeight
      const animationDuration = 1000 // ms
      const startTime = Date.now()

      function animate() {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / animationDuration, 1)
        currentHeight = targetHeight * progress

        ctx.clearRect(x, y, barWidth, chartHeight)
        ctx.fillRect(x, rect.height - padding - currentHeight, barWidth, currentHeight)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      setTimeout(() => animate(), index * 100)

      // Draw x-axis label
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text-secondary")
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x + barWidth / 2, rect.height - padding + 20)
    })

    // Draw y-axis labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text-secondary")
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"

    const yAxisSteps = 5
    for (let i = 0; i <= yAxisSteps; i++) {
      const value = Math.round((maxValue / yAxisSteps) * i)
      const y = rect.height - padding - (chartHeight / yAxisSteps) * i
      ctx.fillText(`$${value}`, padding - 10, y + 4)

      // Draw grid line
      ctx.beginPath()
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--border")
      ctx.setLineDash([5, 5])
      ctx.moveTo(padding, y)
      ctx.lineTo(rect.width - padding, y)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }, [])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  )
}

