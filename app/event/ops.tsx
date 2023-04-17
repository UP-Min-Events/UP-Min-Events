'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { app, auth, db } from '../../firebaseConfig'
import { collection, doc, getDoc, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

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

    const [events, setEvents] = useState<Event[]>([])
    const [eventName, setEventName] = useState<string>('')
    const [eventDesc, setEventDesc] = useState<string>('')
    const [eventDate, setEventDate] = useState<string>('')
    const [eventTime, setEventTime] = useState<string>('')
    const [eventAttending, setEventAttending] = useState<string>('')
    const [editing, setEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState({ name: "", desc: "" });

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
        getEvents()
    }

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

    const attendEvent = async () => {

        if (!user) {
            window.alert('You must be logged in to attend an event!')
            return
        }

        const eventId = eventAttending
        const attendee = user.displayName

        const eventRef = doc(db, 'events', eventId)
        const eventDoc = await getDoc(eventRef)

        if (eventDoc.exists()) {

            const attendees = eventDoc.data().attendees
            if (attendees.includes(attendee)) {
                window.alert('You are already attending this event!')
                setEventAttending('')
                return
            }
            attendees.push(attendee)

            await updateDoc(eventRef, {
                attendees: attendees
            })

        } else {
            window.alert('No such event!')
        }

        setEventAttending('')
        getEvents()
    }

    const deleteEvent = async (eventID: string): Promise<void> => {
        const eventRef = doc(db, 'events', eventID)
        await deleteDoc(eventRef)
        getEvents()
    }

    const updateEvent = async (eventID: string) => {
        const eventRef = doc(db, 'events', eventID);
      
        await updateDoc(eventRef, {
          name: editedEvent.name,
          desc: editedEvent.desc
        });

        setEditing(false);
        getEvents();
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <div className={inter.className}>
            {user && <div>User: {user.displayName}</div>}
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
                        {editing ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedEvent.name}
                                    onChange={(e) =>
                                        setEditedEvent({ ...editedEvent, name: e.target.value })
                                    }
                                />
                                <input
                                    type="text"
                                    value={editedEvent.desc}
                                    onChange={(e) =>
                                        setEditedEvent({ ...editedEvent, desc: e.target.value })
                                    }
                                />
                            </div>
                        ) : (
                            <div>
                                <h3>{event.name}</h3>
                                <p>Event Description: {event.desc}</p>
                            </div>
                        )}
                        <p>Event ID: {event.id}</p>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <div>
                            <p>QR: </p>
                            <Image
                                src={`https://api.qrserver.com/v1/create-qr-code/?data=${event.id}&size=200x200`}
                                width={100}
                                height={100}
                                alt={`${event.name} QR`}
                            />
                        </div>
                        {event.attendees && event.attendees.length > 0 && (
                            <div>
                                <h4>Attendees</h4>
                                {event.attendees.map((attendee) => (
                                    <p key={attendee}>{attendee}</p>
                                ))}
                            </div>
                        )}
                        <button type="button" onClick={() => deleteEvent(event.id)}>
                            Delete
                        </button>

                        {!editing ? (
                            <button type="button" onClick={() => setEditing(true)}>
                                Edit
                            </button>
                        ) : (
                            <button type="button" onClick={() => updateEvent(event.id)}>
                                Save
                            </button>)}
                    </div>
                ))}
            </div>
            <div>
                <h2>Attendee</h2>
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