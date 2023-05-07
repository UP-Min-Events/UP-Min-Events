import Link from 'next/link'
import styles from './page.module.css'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface Props {
    id: string,
    name: string,
    date: string,
    time: string
}

export default function Event({ id, name, date, time } : Props){
    return (
        <Link className={styles.event} href={`/event/${id}`}>
            <div className={styles.eventDetails}>
                <h2>{name}</h2>
                <p>{date}, {time}</p>
                <p>Venue</p>
            </div>

            <div className={styles.eventAction}>
                <KeyboardDoubleArrowRightIcon sx={{ scale: '250%', color: '#a70000' }}/>
            </div>
        </Link>
    )
}