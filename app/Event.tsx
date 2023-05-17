import Link from 'next/link'
import styles from './page.module.scss'
import { useState, useEffect } from 'react'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface Props {
    id: string,
    name: string,
    date: string,
    startTime: string,
    endTime: string,
    venue: string
}

export default function Event({ id, name, date, startTime, endTime, venue } : Props){
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const eventDate = new Date(date + " " + startTime);
        const currentDate = new Date();
        const eventEndDate = new Date(date + " " + endTime);

        if (currentDate >= eventDate && currentDate <= eventEndDate) {
            setStatus("Ongoing");
        } else if (currentDate < eventDate) {
            setStatus("Upcoming");
        } else {
            setStatus("Finished");
        }
        
    }, [date, startTime, endTime]); 

    return (
        <Link className={styles.event} href={`/event/${id}`}>
            <div className={styles.eventDetails}>
                <h2>{name}</h2>
                <p className={styles['text-red']}>{date} {startTime}</p>
                <p>{venue}</p>
                <p>Status: {status}</p>
            </div>

            <div className={styles.eventAction}>
                <KeyboardDoubleArrowRightIcon sx={{ scale: '250%', color: '#a70000' }}/>
            </div>
        </Link>
    )
}