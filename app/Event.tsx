import Link from 'next/link'
import styles from './page.module.css'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface Props {
    id: string,
    name: string,
    date: string,
    time: string
    venue: string
}

export default function Event({ id, name, date, time, venue } : Props){
    return (
        <Link className={styles.event} href={`/event/${id}`}>
            <div className={styles.eventDetails}>
                <h2>{name}</h2>
                <p>{date}, {time}</p>
                <p>{venue}</p>
            </div>

            <div className={styles.eventAction}>
                <KeyboardDoubleArrowRightIcon sx={{ scale: '250%', color: '#a70000' }}/>
            </div>
        </Link>
    )
}