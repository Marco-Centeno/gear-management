import type { InputHTMLAttributes } from "react"
import "./input.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  success?: boolean
  icon?: string
  className?: string
}

export default function Input({ error = false, success = false, icon, className = "", ...props }: InputProps) {
  // Si se proporciona value pero no onChange, convertimos value a defaultValue
  const inputProps = { ...props }
  if (inputProps.value !== undefined && !inputProps.onChange && !inputProps.readOnly) {
    inputProps.defaultValue = inputProps.value
    delete inputProps.value
  }

  const classNames = [
    "input",
    error ? "input-error" : "",
    success ? "input-success" : "",
    icon ? "input-with-icon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="input-wrapper">
      <input className={classNames} {...inputProps} />
      {icon && (
        <div className="input-icon">
          <svg
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
            {icon === "search" && <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />}
            {icon === "mail" && (
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
            )}
            {icon === "lock" && (
              <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4" />
            )}
          </svg>
        </div>
      )}
    </div>
  )
}

