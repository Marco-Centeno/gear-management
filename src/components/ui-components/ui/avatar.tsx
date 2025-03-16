import "./avatar.css"

interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  icon?: string
  size?: "sm" | "md" | "lg"
  status?: "online" | "offline" | "away" | "busy"
  className?: string
}

export default function Avatar({ src, alt = "", initials, icon, size = "md", status, className = "" }: AvatarProps) {
  const classNames = ["avatar", `avatar-${size}`, status ? `avatar-${status}` : "", className].filter(Boolean).join(" ")

  return (
    <div className={classNames}>
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="avatar-img"
          onError={(e) => {
            e.currentTarget.style.display = "none"
            const fallbackEl = e.currentTarget.nextElementSibling
            if (fallbackEl) fallbackEl.style.display = "flex"
          }}
        />
      ) : null}

      {!src && initials && <div className="avatar-initials">{initials}</div>}

      {!src && !initials && icon && (
        <div className="avatar-icon">
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}

      {status && <span className="avatar-status"></span>}
    </div>
  )
}

