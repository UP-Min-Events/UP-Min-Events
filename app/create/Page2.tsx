'use client'

import { useState } from 'react'
import { Inter } from 'next/font/google'

import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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
        <div id="form">
            <div id="formHeader">
                <IconButton size="large" onClick={back}
                        sx={{
                            scale: '1.4',
                            position: 'relative',
                            left: '0',
                            color: '#a70000',
                            fontWeight: 'bold',
                            padding: '0',
                            mb: '1em',
                        }}> 
                        <ArrowBackIcon /> 
                </IconButton> 
                <h1>Create Event</h1>
                <div id="progressBar">
                    <div id="progress"> </div> <div id="progress"> </div> 
                </div>   
            </div>
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
            <button id="formButton" className={inter.className} onClick={finish}>Finish</button>
        </div>
    )
}