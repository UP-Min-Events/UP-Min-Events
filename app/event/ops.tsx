'use client'

import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { app, db } from '../../firebaseConfig'
import { collection, doc, getDoc, addDoc, getDocs, updateDoc } from 'firebase/firestore'

const inter = Inter({ subsets: ['latin']})

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

    const [events, setEvents] = useState<Event[]>([])
    const [eventName, setEventName] = useState<string>('')
    const [eventDesc, setEventDesc] = useState<string>('')
    const [eventDate, setEventDate] = useState<string>('')
    const [eventTime, setEventTime] = useState<string>('')
    const [attendeeName, setAttendeeName] = useState<string>('')
    const [eventAttending, setEventAttending] = useState<string>('')

    const updateFeed = () => {
        getEvents()
    }
    
    const createEvent = async () => {
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

    const attendEvent = async () => {
        const eventId = eventAttending
        const attendee = attendeeName

        const eventRef = doc(db, 'events', eventId)
        const eventDoc = await getDoc(eventRef)

        if (eventDoc.exists()) {

            const attendees = eventDoc.data().attendees
            attendees.push(attendee)

            await updateDoc(eventRef, {
                attendees: attendees
            })
            
        } else {
            window.alert('No such document!')
        }

        setAttendeeName('')
        setEventAttending('')
        getEvents()
    }

    useEffect(() => {
        getEvents()
    }, [])

    return(
        <div className={inter.className}>
            <button onClick={updateFeed}>Refresh</button>
            <div>
                <input 
                    type="text" 
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
                <input 
                    type="text"
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                />
                <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                />
                <input 
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)} 
                />
                <button onClick={createEvent}>Create New Event</button>
            </div>
            <div>
                <h1>Events</h1>
                {events.map((event) => (
                    <div key={event.id}>
                        <h3>{event.name}</h3>
                        <p>Event ID: {event.id}</p>
                        <p>Event Description: {event.desc}</p>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
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
            <div>
                <h2>Attendee</h2>
                <input 
                    type="text"
                    value={attendeeName}
                    onChange={(e) => setAttendeeName(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Event ID"
                    value={eventAttending} 
                    onChange={(e) => setEventAttending(e.target.value)}
                />
                <button onClick={attendEvent}>Attend</button>
            </div>
            
        </div>
    )
}