import Link from 'next/link'
import styles from './page.module.css'

interface Props {
    id: string,
    name: string,
    date: string,
    time: string
}

export default function Event({ id, name, date, time } : Props){
    return (
        <Link className={styles.event} href={`/${id}`}>
            <h2>{title}</h2>
            <p>{date}</p>
            <p>{time}</p>
        </Link>
    )
}