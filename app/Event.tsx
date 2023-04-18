import Link from 'next/link'
import styles from './page.module.css'

export default function Event({ id, title, date, time }){
    return (
        <Link className={styles.event} href={`/${id}`}>
            <h2>{title}</h2>
            <p>{date}</p>
            <p>{time}</p>
        </Link>
    )
}