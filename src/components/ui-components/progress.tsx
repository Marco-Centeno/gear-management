import styles from "./progress.module.css"

interface ProgressProps {
  value?: number
  className?: string
}

export function Progress({ value = 0, className = "" }: ProgressProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div
        className={styles.indicator}
        style={{ width: `${value}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}

