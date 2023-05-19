'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Event from './Event'

import { auth, db } from '@/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

const inter = Inter({ subsets: ['latin'] })

interface Event {
    name: string;
    desc: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    attendees: string[];
    id: string;
}

export default function MyEvents() {

    const [user] = useAuthState(auth)
    const dbInstance = collection(db, 'events')
    const [events, setEvents] = useState<Event[]>([])

    const getEvents = async () => {

        const querySnapshot = await getDocs(dbInstance)
        const events: Event[] = []

        querySnapshot.forEach((doc) => {
            doc.data().owner === user?.uid ? events.push({
                name: doc.data().name,
                desc: doc.data().desc,
                date: doc.data().date,
                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                venue: doc.data().venue,
                attendees: doc.data().attendees,
                id: doc.id
            }) : null
        })

        setEvents(events)
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <div>
            <h1>Your Events</h1>
            <div className={`${inter.className} ${styles.eventsContainer}`}>
            {events.map((event) => (
                <Event
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    date={event.date}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    venue={event.venue}
                />
            ))}
            </div>
        </div>
    )
}