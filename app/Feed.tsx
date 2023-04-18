'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
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

    const updateFeed = () => {
        getEvents()
    }

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
                    <div key={event.id}>
                        <h3>{event.name}</h3>
                        <p>Event ID: {event.id}</p>
                        <p>Event Description: {event.desc}</p>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <div>
                            <p>QR: </p>
                            <Image src={`https://api.qrserver.com/v1/create-qr-code/?data=${event.id}&size=200x200`} width={100} height={100} alt={`${event.name} QR`} />
                        </div>
                        { event.attendees && event.attendees.length > 0 && (
                            <div>
                                <h4>Attendees</h4>
                                {event.attendees.map((attendee) => (
                                    <p key={attendee}>{attendee}</p>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    )
}