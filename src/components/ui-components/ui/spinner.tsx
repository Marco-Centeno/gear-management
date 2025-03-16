import "./spinner.css"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info"
  type?: "border" | "grow" | "dots" | "ring"
  className?: string
}

export default function Spinner({ size = "md", variant = "primary", type = "border", className = "" }: SpinnerProps) {
  const classNames = ["spinner", `spinner-${type}`, `spinner-${size}`, `spinner-${variant}`, className]
    .filter(Boolean)
    .join(" ")

  if (type === "dots") {
    return (
      <div className={classNames}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    )
  }

  return <div className={classNames} />
}

