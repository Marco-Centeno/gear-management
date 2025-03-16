import type { TextareaHTMLAttributes } from "react"
import styles from "./textarea.module.css"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export function Textarea({ className = "", ...props }: TextareaProps) {
  return <textarea className={`${styles.textarea} ${className}`} {...props} />
}

