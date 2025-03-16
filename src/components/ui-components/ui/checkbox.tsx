import type { InputHTMLAttributes } from "react"
import "./checkbox.css"

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  className?: string
}

export default function Checkbox({ label, id, className = "", ...props }: CheckboxProps) {
  return (
    <div className={`checkbox-wrapper ${className}`}>
      <input type="checkbox" id={id} className="checkbox" {...props} />
      {label && (
        <label htmlFor={id} className="checkbox-label">
          {label}
        </label>
      )}
    </div>
  )
}

