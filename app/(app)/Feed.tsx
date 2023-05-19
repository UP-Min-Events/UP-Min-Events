'use client'

import Event from './Event'
import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useUserTypeContext } from './providers/UserTypeProvider'

import { db, auth } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

const inter = Inter({ subsets: ['latin']})

interface Event {
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    id: string;
}

export default function Feed() {

    const dbInstance = collection(db, 'events')
    const [events, setEvents] = useState<Event[]>([])
    const { userType } = useUserTypeContext()
    const [user] = useAuthState(auth)

    const getEvents = async () => {
        const querySnapshot = await getDocs(dbInstance)
        const events: Event[] = []
        querySnapshot.forEach((doc) => {
            if (doc.data().visibility === 'Private') return
            if (userType === 'organizer' && doc.data().owner !== user?.uid) return
            
            events.push({
                name: doc.data().name,
                date: doc.data().date,
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

    return(
        <main>
            <div className={styles['header-wrapper']}>
                <h1>Live Events</h1>  
                <div className={styles.divider}></div>  
            </div>
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
        </main>
    )
}