import "./progress.css"

interface ProgressProps {
  value: number | number[]
  variant?: "primary" | "success" | "warning" | "danger" | "info"
  height?: number
  showValue?: boolean
  className?: string
}

export default function Progress({
  value,
  variant = "primary",
  height = 6,
  showValue = false,
  className = "",
}: ProgressProps) {
  const isMultiple = Array.isArray(value)

  const classNames = ["progress", className].filter(Boolean).join(" ")

  return (
    <div className="progress-wrapper">
      <div className={classNames} style={{ height: `${height}px` }}>
        {isMultiple ? (
          value.map((val, index) => (
            <div
              key={index}
              className={`progress-bar progress-bar-${index === 0 ? variant : ["success", "warning", "danger", "info"][index % 4]}`}
              style={{ width: `${val}%` }}
              role="progressbar"
              aria-valuenow={val}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          ))
        ) : (
          <div
            className={`progress-bar progress-bar-${variant}`}
            style={{ width: `${value}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        )}
      </div>
      {showValue && !isMultiple && <div className="progress-value">{value}%</div>}
    </div>
  )
}

