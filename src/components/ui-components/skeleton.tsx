import type { HTMLAttributes } from "react"
import styles from "./skeleton.module.css"

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return <div className={`${styles.skeleton} ${className}`} {...props} />
}

