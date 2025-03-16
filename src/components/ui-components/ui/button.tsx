import type { ReactNode, ButtonHTMLAttributes } from "react"
import "./button.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link"
  size?: "sm" | "md" | "lg"
  outline?: boolean
  rounded?: boolean
  block?: boolean
  loading?: boolean
  active?: boolean
}

export default function Button({
  children,
  variant = "default",
  size = "md",
  outline = false,
  rounded = false,
  block = false,
  loading = false,
  active = false,
  className = "",
  ...props
}: ButtonProps) {
  const classNames = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    outline ? "btn-outline" : "",
    rounded ? "btn-rounded" : "",
    block ? "btn-block" : "",
    loading ? "btn-loading" : "",
    active ? "btn-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={classNames} {...props}>
      {loading && (
        <span className="btn-spinner">
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
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </span>
      )}
      {children}
    </button>
  )
}

