'use client'

import Event from './Event'

import { useState, useEffect } from 'react'

import { db, auth } from '@/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'

interface Event {
    name: string;
    date: Date;
    startTime: string;
    endTime: string;
    venue: string;
    id: string;
}

export default function OtherEvents() {

    let userid: string
    const user = auth.currentUser
    const eventscollection = collection(db, 'events')
    const [events, setEvents] = useState<Event[]>([])

    if (user) {
        userid = user.uid
    }

    const getEvents = async () => {
        const q = query(
            eventscollection, 
            where('visibility', '==', 'Public'),
            where('owner', '!=', userid)    
        )
        
        const querySnapshot = await getDocs(q)
        const events: Event[] = []

        querySnapshot.forEach((doc) => {
            events.push({
                name: doc.data().name,
                date: doc.data().date.toDate(),
                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                venue: doc.data().venue,
                id: doc.id
            })
        })

        setEvents(events)
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
            {
                events.map((event) => (
                    <Event
                        key={event.id}
                        name={event.name}
                        date={event.date}
                        startTime={event.startTime}
                        endTime={event.endTime}
                        venue={event.venue}
                        id={event.id}
                    />
                ))
            }
        </>
    )
}