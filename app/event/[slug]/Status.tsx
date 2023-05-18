import { useState, useEffect } from 'react';

interface Props {
    date: string;
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
        <>
            <p>Status: {status}</p>
        </>
    );
}

export default Status;