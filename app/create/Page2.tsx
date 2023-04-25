'use client'

import { useState } from 'react'

export default function Page2(){
      
    const [eventDate, setEventDate] = useState<string>('')
    const [eventTime, setEventTime] = useState<string>('')
    const [eventVenue, setEventVenue] = useState<string>('')

    return(
        <div>
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
        </div>
    )
}