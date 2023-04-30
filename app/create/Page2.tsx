'use client'

import { Button } from '@mui/material'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    createEvent: () => void,
    prevPage: () => void,
    eventDate: string,
    eventTime: string,
    eventVenue: string,
    handleEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVenueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Page2({ 
    createEvent, 
    prevPage,
    eventDate,
    eventTime,
    eventVenue,
    handleEventDateChange,
    handleEventTimeChange,
    handleEventVenueChange,
} : Props ) {
    
    const finish = () => {
        createEvent()
    }

    const back = () => {
        prevPage()
    }

    return(
        <div>
            <button onClick={back}>Back</button>
            <h1>Page 2</h1>
            <div>
                <p>Date</p>
                <input
                    type="date"
                    value={eventDate}
                    onChange={handleEventDateChange}
                />
            </div>
            <div>
                <p>Time</p>
                <input
                    type="time"
                    value={eventTime}
                    onChange={handleEventTimeChange}
                />
            </div>
            <div>
                <p>Venue</p>
                <input 
                    type="text"
                    value={eventVenue}
                    onChange={handleEventVenueChange} 
                />
            </div>
            <div>
                <p>Population Limit</p>
                <input type="range" />
            </div>
            <div>
                <p>Visibility</p>
                <select name="" id="">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
            </div>
            <div>
                <p>Restrictions</p>
                <input type="text" />
            </div>
            <Button 
                    variant="text" 
                    className={inter.className} 
                    onClick={finish}
                    sx={{
                        position: 'fixed',
                        bottom: '3rem',
                        backgroundColor: '#a70000',
                        color: '#fff',
                        fontWeight: 'bold',
                        width: '12em',
                        borderRadius: '1em',    
                        mx: 'auto',
                    }}
                >
                    Finish
                </Button> 
        </div>
    )
}