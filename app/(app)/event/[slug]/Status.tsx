import { useState, useEffect } from 'react';
import styles from './page.module.css'

interface Props {
    date: Date;
    startTime: string;
    endTime: string;
}

const Status = ({ date, startTime, endTime }: Props) => {
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
        <div className={styles['status-wrapper']}>
            <p>Status:&nbsp;</p>
            {status === "Ongoing" ?
                <div className={styles['event-ongoing']}> {status} </div>
            : status === "Upcoming" ?
                <div className={styles['event-upcoming']}> {status} </div>
            : status === "Finished" ?
                <div className={styles['event-finished']}> {status} </div>
            :
                <> Unknown Event Status. </>
            }
        </div>
    );
}

export default Status;