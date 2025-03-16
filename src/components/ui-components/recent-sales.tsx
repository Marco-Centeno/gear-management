import { Avatar } from "@/components/avatar"
import styles from "./recent-sales.module.css"

export function RecentSales() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Avatar className={styles.avatar} src="/placeholder.svg?height=36&width=36" alt="Avatar" fallback="JD" />
        <div className={styles.info}>
          <p className={styles.name}>Juan Pérez</p>
          <p className={styles.email}>juan.perez@example.com</p>
        </div>
        <div className={styles.amount}>+$1,999.00</div>
      </div>
      <div className={styles.item}>
        <Avatar className={styles.avatar} src="/placeholder.svg?height=36&width=36" alt="Avatar" fallback="LM" />
        <div className={styles.info}>
          <p className={styles.name}>Laura Martínez</p>
          <p className={styles.email}>laura.martinez@example.com</p>
        </div>
        <div className={styles.amount}>+$39.00</div>
      </div>
      <div className={styles.item}>
        <Avatar className={styles.avatar} src="/placeholder.svg?height=36&width=36" alt="Avatar" fallback="CG" />
        <div className={styles.info}>
          <p className={styles.name}>Carlos González</p>
          <p className={styles.email}>carlos.gonzalez@example.com</p>
        </div>
        <div className={styles.amount}>+$299.00</div>
      </div>
      <div className={styles.item}>
        <Avatar className={styles.avatar} src="/placeholder.svg?height=36&width=36" alt="Avatar" fallback="MR" />
        <div className={styles.info}>
          <p className={styles.name}>María Rodríguez</p>
          <p className={styles.email}>maria.rodriguez@example.com</p>
        </div>
        <div className={styles.amount}>+$99.00</div>
      </div>
      <div className={styles.item}>
        <Avatar className={styles.avatar} src="/placeholder.svg?height=36&width=36" alt="Avatar" fallback="AS" />
        <div className={styles.info}>
          <p className={styles.name}>Alejandro Sánchez</p>
          <p className={styles.email}>alejandro.sanchez@example.com</p>
        </div>
        <div className={styles.amount}>+$149.00</div>
      </div>
    </div>
  )
}

