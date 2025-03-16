import type { ReactNode } from "react"
import "./card.css"

interface CardProps {
  children: ReactNode
  title?: string
  description?: string
  image?: string
  actions?: ReactNode
  className?: string
}

export default function Card({ children, title, description, image, actions, className = "" }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {image && (
        <div className="card-image">
          <img src={image || "/placeholder.svg"} alt={title || "Card image"} />
        </div>
      )}
      <div className="card-content">
        {(title || description) && (
          <div className="card-header">
            {title && <h3 className="card-title">{title}</h3>}
            {description && <p className="card-description">{description}</p>}
          </div>
        )}
        <div className="card-body">{children}</div>
        {actions && <div className="card-actions">{actions}</div>}
      </div>
    </div>
  )
}

