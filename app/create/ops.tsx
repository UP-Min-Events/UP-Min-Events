'use client'

import { Inter } from 'next/font/google'
import { useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const inter = Inter({ subsets: ['latin'] })

interface Event {
    name: string;
    desc: string;
    date: string;
    time: string;
    attendees: string[];
    id: string;
}

export default function Ops() {

    const dbInstance = collection(db, 'events')
    const user = auth.currentUser

    const [eventName, setEventName] = useState<string>('')
    const [eventHost, setEventHost] = useState<string>('')
    const [eventDesc, setEventDesc] = useState<string>('')
    const [eventDate, setEventDate] = useState<string>('')
    const [eventTime, setEventTime] = useState<string>('')
    const [eventVenue, setEventVenue] = useState<string>('')

    const createEvent = async () => {
        if (user === null) {
            window.alert('You must be logged in to create an event!')
            return
        }

        const docRef = await addDoc(dbInstance, {
            name: eventName,
            desc: eventDesc,
            date: eventDate,
            time: eventTime,
            attendees: [],
        })

        setEventName('')
        setEventDesc('')
        setEventDate('')
        setEventTime('')
    }

    return (
        <div className={inter.className}>
            <div>
                <div>
                    <p>Title</p>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                </div>
                <div>
                    <p>Host</p>
                    <input
                        type="text"
                        value={eventHost}
                        onChange={(e) => setEventHost(e.target.value)}
                    />
                </div>
                <div>
                    <p>Description</p>
                    <input
                        type="text"
                        value={eventDesc}
                        onChange={(e) => setEventDesc(e.target.value)}
                    />
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
                <button onClick={createEvent}>Finish</button>
            </div>
            

        </div>
    )
}