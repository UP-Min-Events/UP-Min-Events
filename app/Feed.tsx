'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Event from './Event'

import { db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

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
        <div>
            <h1>Live Events</h1>    
            <div className={`${inter.className} ${styles.eventsContainer}`}>
                {events.map((event) => (
                    <Event 
                        key={event.id} 
                        id={event.id}
                        name={event.name} 
                        date={event.date} 
                        time={event.time} 
                    />
                ))}
            </div>
        </div>
    )
}