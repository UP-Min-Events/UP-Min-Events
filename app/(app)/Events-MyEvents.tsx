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

export default function MyEvents() {

    let userid: string
    const user = auth.currentUser
    const eventscollection = collection(db, 'events')
    const [events, setEvents] = useState<Event[]>([])

    if (user) {
        userid = user.uid
    }

    const getCoOwnedEvents = async () => {
        const q = query(eventscollection, where('coOwners', 'array-contains', user?.email));
        const querySnapshot = await getDocs(q);
        const eventPlaceholder: Event[] = [];

        querySnapshot.forEach((doc) => {
            eventPlaceholder.push({
                name: doc.data().name,
                date: doc.data().date.toDate(),
                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                venue: doc.data().venue,
                id: doc.id
            })
        })

        return eventPlaceholder;
    }

    // const getEvents = async () => {
    //     const q = query(
    //         eventscollection, 
    //         where('owner', '==', userid)    
    //     )

    //     const querySnapshot = await getDocs(q)
    //     const events: Event[] = []

    //     querySnapshot.forEach((doc) => {
    //         events.push({
    //             name: doc.data().name,
    //             date: doc.data().date.toDate(),
    //             startTime: doc.data().startTime,
    //             endTime: doc.data().endTime,
    //             venue: doc.data().venue,
    //             id: doc.id
    //         })
    //     })

    //     const CoOwnedEvents = await getCoOwnedEvents()
    //     setEvents([...events, ...CoOwnedEvents]);

    //     console.log(events)

    //     // Sort events by date and time
    //     const sortedEvents = [...events].sort((a, b) => {
    //         const dateComparison = a.date.getTime() - b.date.getTime();
    //         if (dateComparison === 0) {
    //             // If dates are the same, compare start times
    //             return a.startTime.localeCompare(b.startTime);
    //         }
    //         return dateComparison;
    //     });

    //     setEvents(sortedEvents)
    // }

    const getEvents = async () => {
        const q = query(eventscollection, where('owner', '==', userid));

        const querySnapshot = await getDocs(q);
        const events: Event[] = [];

        querySnapshot.forEach((doc) => {
            events.push({
                name: doc.data().name,
                date: doc.data().date.toDate(),
                startTime: doc.data().startTime,
                endTime: doc.data().endTime,
                venue: doc.data().venue,
                id: doc.id,
            });
        });

        const coOwnedEvents = await getCoOwnedEvents();
        setEvents([...events, ...coOwnedEvents]);

        // Sort events by date and time
        const sortedEvents = [...events, ...coOwnedEvents].sort((a, b) => {
            const dateComparison = a.date.getTime() - b.date.getTime();
            if (dateComparison === 0) {
                // If dates are the same, compare start times
                return a.startTime.localeCompare(b.startTime);
            }
            return dateComparison;
        });

        setEvents(sortedEvents);
    };

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