import type { InputHTMLAttributes } from "react"
import "./radio.css"

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  className?: string
}

export default function Radio({ label, id, className = "", ...props }: RadioProps) {
  return (
    <div className={`radio-wrapper ${className}`}>
      <input type="radio" id={id} className="radio" {...props} />
      {label && (
        <label htmlFor={id} className="radio-label">
          {label}
        </label>
      )}
    </div>
  )
}

