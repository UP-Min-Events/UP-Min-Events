import Link from 'next/link'
import styles from './page.module.scss'
import { useState, useEffect } from 'react'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface Props {
    id: string,
    name: string,
    date: Date,
    startTime: string,
    endTime: string,
    venue: string
}

export default function Event({ id, name, date, startTime, endTime, venue }: Props) {
    const [time12Hour, setTime12Hour] = useState<string | undefined>(undefined);

    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
    
    // Get event status
    useEffect(() => {

        // Format time to 12-hour format
        if (startTime && startTime !== undefined) {
            const hourOptions: Intl.DateTimeFormatOptions = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };

            const time = new Date();
            time.setHours(Number(startTime.split(":")[0]));
            time.setMinutes(Number(startTime.split(":")[1]));

            setTime12Hour(time.toLocaleTimeString("en-US", hourOptions));
        }
    }, [date, startTime, endTime]);

    return ( 
        <Link className={styles.event} href={`/event/${id}`}>
            <div className={styles['details-wrapper']}>
                <div className={styles['event-details']}>
                    <h2>{name}</h2>
                    <p className={styles['text-red']}>{formattedDate} | {time12Hour}</p>
                    <p>{venue}</p>
                </div>
            </div>
            <div className={styles['event-arrow']}>
                <KeyboardDoubleArrowRightIcon sx={{ scale: '175%' }} />
            </div>
        </Link>
    )
}