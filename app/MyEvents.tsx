'use client'

import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Event from './Event'

import { auth, db } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

const inter = Inter({ subsets: ['latin'] })

interface Event {
    name: string;
    desc: string;
    date: string;
    time: string;
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
                time: doc.data().time,
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
        <div className={inter.className} >
            <div>
                <h1>Your Events</h1>
            </div>
            <div>
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