'use client'

import Event from './Event'

import { useEffect, useState } from 'react'

import { db } from '@/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

interface Event {
    name: string;
    id: string;
}

export default function Events() {

    const eventsdb = collection(db, 'events')
    const [events, setEvents] = useState<Event[]>([])

    const getEvents = async () => {
        const querySnapshot = await getDocs(eventsdb)
        const events: Event[] = []

        querySnapshot.forEach((doc) => {
            events.push({
                name: doc.data().name,
                id: doc.id
            })
        })

        setEvents(events)
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <div>
            <div>
                <h1>Events</h1>
            </div>
            <div>
                {events.map((event) => {
                    return (
                        <Event
                        key={event.id} 
                        name={event.name} 
                        id={event.id} 
                        />
                    )
                })}
            </div>
        </div>
    )
}