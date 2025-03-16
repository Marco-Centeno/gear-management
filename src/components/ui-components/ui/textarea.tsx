import type { TextareaHTMLAttributes } from "react"
import "./textarea.css"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  success?: boolean
  className?: string
}

export default function Textarea({ error = false, success = false, className = "", ...props }: TextareaProps) {
  // Si se proporciona value pero no onChange, convertimos value a defaultValue
  const textareaProps = { ...props }
  if (textareaProps.value !== undefined && !textareaProps.onChange && !textareaProps.readOnly) {
    textareaProps.defaultValue = textareaProps.value
    delete textareaProps.value
  }

  const classNames = ["textarea", error ? "textarea-error" : "", success ? "textarea-success" : "", className]
    .filter(Boolean)
    .join(" ")

  return <textarea className={classNames} {...textareaProps} />
}

