"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import "./select.css"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  error?: boolean
  searchable?: boolean
  className?: string
}

export default function Select({
  options,
  placeholder = "Select an option",
  value,
  onChange,
  disabled = false,
  error = false,
  searchable = true,
  className = "",
}: SelectProps) {
  // Estado interno para el valor seleccionado
  const [internalValue, setInternalValue] = useState(value || "")

  // Estado para controlar si el dropdown está abierto
  const [isOpen, setIsOpen] = useState(false)

  // Estado para el texto de búsqueda
  const [searchText, setSearchText] = useState("")

  // Referencia al contenedor del select
  const selectRef = useRef<HTMLDivElement>(null)

  // Referencia al input de búsqueda
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Determinamos si el componente es controlado o no
  const isControlled = value !== undefined && onChange !== undefined
  const currentValue = isControlled ? value : internalValue

  // Filtramos las opciones basadas en el texto de búsqueda
  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchText.toLowerCase()))

  // Obtenemos la etiqueta de la opción seleccionada
  const selectedLabel = options.find((option) => option.value === currentValue)?.label || ""

  // Manejador para cuando se selecciona una opción
  const handleSelect = (option: SelectOption) => {
    if (!isControlled) {
      setInternalValue(option.value)
    }
    onChange?.(option.value)
    setIsOpen(false)
    setSearchText("")
  }

  // Manejador para el cambio en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  // Manejador para abrir/cerrar el dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (!isOpen && searchable) {
        // Enfocamos el input de búsqueda cuando se abre el dropdown
        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 0)
      }
    }
  }

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchText("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Clases CSS
  const selectClassNames = [
    "select-container",
    error ? "select-error" : "",
    disabled ? "select-disabled" : "",
    isOpen ? "select-open" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div ref={selectRef} className={selectClassNames}>
      <div className="select-trigger" onClick={toggleDropdown}>
        <span className={`select-value ${!currentValue ? "select-placeholder" : ""}`}>
          {currentValue ? selectedLabel : placeholder}
        </span>
        <svg
          className="select-arrow"
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
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {searchable && (
            <div className="select-search">
              <input
                ref={searchInputRef}
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Buscar..."
                className="select-search-input"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`select-option ${option.value === currentValue ? "select-option-selected" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="select-no-options">No hay opciones disponibles</div>
            )}
          </div>
        </div>
      )}

      {/* Select nativo oculto para accesibilidad */}
      <select
        value={currentValue}
        onChange={(e) => {
          const selectedOption = options.find((opt) => opt.value === e.target.value)
          if (selectedOption) {
            handleSelect(selectedOption)
          }
        }}
        disabled={disabled}
        className="select-native"
        aria-hidden="true"
        tabIndex={-1}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

