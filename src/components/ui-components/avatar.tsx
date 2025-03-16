import type { ReactNode } from "react"
import styles from "./avatar.module.css"

interface AvatarProps {
  src?: string
  alt?: string
  fallback: ReactNode | string
  className?: string
}

export function Avatar({ src, alt = "", fallback, className = "" }: AvatarProps) {
  return (
    <div className={`${styles.avatar} ${className}`}>
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={styles.image}
          onError={(e) => {
            e.currentTarget.style.display = "none"
            const fallbackEl = e.currentTarget.nextElementSibling
            if (fallbackEl) fallbackEl.style.display = "flex"
          }}
        />
      ) : null}
      <div className={styles.fallback} style={{ display: src ? "none" : "flex" }}>
        {typeof fallback === "string" ? fallback : fallback}
      </div>
    </div>
  )
}

