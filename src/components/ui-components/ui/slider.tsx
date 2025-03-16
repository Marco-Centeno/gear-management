"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import "./slider.css"

interface SliderProps {
  min?: number
  max?: number
  step?: number
  defaultValue?: number | number[]
  disabled?: boolean
  showValue?: boolean
  onChange?: (value: number | number[]) => void
  className?: string
}

export default function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
  disabled = false,
  showValue = false,
  onChange,
  className = "",
}: SliderProps) {
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
      trackRef.current.style.background = `linear-gradient(to right, var(--secondary-light) 0%, var(--secondary-light) ${start}%, var(--primary) ${start}%, var(--primary) ${end}%, var(--secondary-light) ${end}%, var(--secondary-light) 100%)`
    } else if (!isRange && !Array.isArray(value)) {
      const percent = getPercentage(value)
      trackRef.current.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percent}%, var(--secondary-light) ${percent}%, var(--secondary-light) 100%)`
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

  const classNames = ["slider-container", disabled ? "slider-disabled" : "", className].filter(Boolean).join(" ")

  return (
    <div className={classNames}>
      <div ref={trackRef} className="slider-track"></div>

      {isRange && Array.isArray(value) ? (
        <>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => handleSliderChange(e, 0)}
            className="slider slider-start"
            disabled={disabled}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => handleSliderChange(e, 1)}
            className="slider slider-end"
            disabled={disabled}
          />
          {showValue && (
            <div className="slider-values">
              <span>{value[0]}</span>
              <span>{value[1]}</span>
            </div>
          )}
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
            className="slider"
            disabled={disabled}
          />
          {showValue && <div className="slider-value">{Array.isArray(value) ? value[0] : value}</div>}
        </>
      )}
    </div>
  )
}

