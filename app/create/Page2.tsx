'use client'

import { useState } from 'react'
import { Button } from '@mui/material'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Page2({ createEvent, prevPage }){
      
    const [eventDate, setEventDate] = useState<string>('')
    const [eventTime, setEventTime] = useState<string>('')
    const [eventVenue, setEventVenue] = useState<string>('')

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
                    onChange={(e) => setEventDate(e.target.value)}
                />
            </div>
            <div>
                <p>Time</p>
                <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                />
            </div>
            <div>
                <p>Venue</p>
                <input 
                    type="text"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)} 
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