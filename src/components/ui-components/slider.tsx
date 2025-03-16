"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import styles from "./slider.module.css"

interface SliderProps {
  defaultValue?: number | number[]
  min?: number
  max?: number
  step?: number
  className?: string
  onChange?: (value: number | number[]) => void
}

export function Slider({ defaultValue = 0, min = 0, max = 100, step = 1, className = "", onChange }: SliderProps) {
  const isRange = Array.isArray(defaultValue)
  const [value, setValue] = useState<number | number[]>(defaultValue)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleChange = (newValue: number | number[]) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100
  }

  const updateTrackStyle = () => {
    if (!trackRef.current) return

    if (isRange && Array.isArray(value)) {
      const start = getPercentage(value[0])
      const end = getPercentage(value[1])
      trackRef.current.style.background = `linear-gradient(to right, var(--secondary) 0%, var(--secondary) ${start}%, var(--primary) ${start}%, var(--primary) ${end}%, var(--secondary) ${end}%, var(--secondary) 100%)`
    } else if (!isRange && !Array.isArray(value)) {
      const percent = getPercentage(value)
      trackRef.current.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percent}%, var(--secondary) ${percent}%, var(--secondary) 100%)`
    }
  }

  useEffect(() => {
    updateTrackStyle()
  }, [value])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const newValue = Number(e.target.value)

    if (isRange && Array.isArray(value) && index !== undefined) {
      const newValues = [...value]
      newValues[index] = newValue

      // Ensure min value doesn't exceed max value and vice versa
      if (index === 0 && newValue > value[1]) {
        newValues[0] = value[1]
      } else if (index === 1 && newValue < value[0]) {
        newValues[1] = value[0]
      }

      handleChange(newValues)
    } else {
      handleChange(newValue)
    }
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div ref={trackRef} className={styles.track}></div>

      {isRange && Array.isArray(value) ? (
        <>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => handleSliderChange(e, 0)}
            className={`${styles.range} ${styles.rangeStart}`}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => handleSliderChange(e, 1)}
            className={`${styles.range} ${styles.rangeEnd}`}
          />
          <div className={styles.thumbs}>
            <div className={styles.thumb} style={{ left: `calc(${getPercentage(value[0])}% - 8px)` }}></div>
            <div className={styles.thumb} style={{ left: `calc(${getPercentage(value[1])}% - 8px)` }}></div>
          </div>
        </>
      ) : (
        <>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={Array.isArray(value) ? value[0] : value}
            onChange={(e) => handleSliderChange(e)}
            className={styles.range}
          />
          <div
            className={styles.thumb}
            style={{ left: `calc(${getPercentage(Array.isArray(value) ? value[0] : value)}% - 8px)` }}
          ></div>
        </>
      )}
    </div>
  )
}

