'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Event from './Event'

import { app, auth, db } from '../firebaseConfig'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'

const inter = Inter({ subsets: ['latin']})

interface Event {
    name: string;
    desc: string;
    date: string;
    time: string;
    attendees: string[];
    id: string;
}

export default function Feed() {

    const dbInstance = collection(db, 'events')
    const [events, setEvents] = useState<Event[]>([])

    const getEvents = async () => {
        const querySnapshot = await getDocs(dbInstance)
        const events: Event[] = []
        querySnapshot.forEach((doc) => {
            events.push({
                name: doc.data().name,
                desc: doc.data().desc,
                date: doc.data().date,
                time: doc.data().time,
                attendees: doc.data().attendees,
                id: doc.id
            })
        })
        setEvents(events)
    }    

    useEffect(() => {
        getEvents()
    }, [])

    return(
        <div className={inter.className}>
            <div>
                <h1>Live Events</h1>
                {events.map((event) => (
                    <Event 
                        key={event.id} 
                        id={event.id} 
                        title={event.name} 
                        desc={event.desc} 
                        date={event.date} 
                        time={event.time} 
                        attendees={event.attendees}
                    />
                ))}
            </div>
        </div>
    )
}