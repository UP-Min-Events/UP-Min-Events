'use client'

import Event from './Event'
import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import { useState, useEffect, useTransition } from 'react'
import { useUserTypeContext } from '../providers/UserTypeProvider'

import { db, auth } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Skeleton } from '@mui/material'
import { get } from 'http'

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
    const [isPending, startTransition] = useTransition()
    const [user] = useAuthState(auth)
    const { userType } = useUserTypeContext()
    const [filter, setFilter] = useState<string>('')
    
    const dateToday = new Date()

    const getEvents = async () => {
        const querySnapshot = await getDocs(dbInstance)
        const events: Event[] = []

        querySnapshot.forEach((doc) => {
            if (doc.data().visibility === 'Private') return
            if ( filter === 'MyEvents') {
                if (doc.data().owner !== user?.uid) return
            } else if (filter === 'Live') {
                const eventDate = new Date(doc.data().date);
                dateToday.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison
            
                if (eventDate.getFullYear() === dateToday.getFullYear() &&
                    eventDate.getMonth() === dateToday.getMonth() &&
                    eventDate.getDate() === dateToday.getDate()) {
                    // The event is happening dateToday, display it
                } else {
                    return; // Skip events that are not happening dateToday
                }
            } else if (filter === 'Upcoming') {
                const eventDate = new Date(doc.data().date)
                if (eventDate < dateToday) return
            } else if (filter === 'Past') {
                const eventDate = new Date(doc.data().date)
                if (eventDate > dateToday) return
                if (eventDate.getFullYear() === dateToday.getFullYear() &&
                    eventDate.getMonth() === dateToday.getMonth() &&
                    eventDate.getDate() === dateToday.getDate()) {
                    return        
                }
            }

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

    const changeFilter = (filter: string) => {
        const button = document.getElementById(filter)
        if (button) {
            button.classList.add(styles['active'])
        }
        
        setFilter(filter)
    }

    useEffect(() => {
        if (userType === 'organizer') {
            changeFilter('MyEvents')
        } else if (userType === 'attendee') {
            changeFilter('All')
        }
    }, []) 

    useEffect(() => {
        getEvents()
    }, [filter])

    return(
        <main>
            <div className={styles['header-wrapper']}>
                <div className={`${styles['filter-wrapper']} ${inter.className}`}>
                    { userType === 'organizer' &&
                        <button
                            onClick={() => {
                                document.getElementById(filter)?.classList.remove(styles['active'])
                                changeFilter('MyEvents')
                            }}
                            id='MyEvents'
                            className={`${styles['filter-chip']}`}
                        >
                            My Events
                        </button>
                    }
                    <button 
                        onClick={() => {
                            document.getElementById(filter)?.classList.remove(styles['active'])
                            changeFilter('All')
                        }}
                        id='All'
                        className={`${styles['filter-chip']}`}>
                        All
                    </button>
                    <button 
                        onClick={() => {
                            document.getElementById(filter)?.classList.remove(styles['active'])
                            changeFilter('Live')
                        }}
                        id='Live'
                        className={`${styles['filter-chip']}`}>
                        Live
                    </button>
                    <button 
                        onClick={() => {
                            document.getElementById(filter)?.classList.remove(styles['active'])
                            changeFilter('Upcoming')
                        }}
                        id='Upcoming'
                        className={`${styles['filter-chip']}`}>
                        Upcoming
                    </button>
                    <button 
                        onClick={() => {
                            document.getElementById(filter)?.classList.remove(styles['active'])
                            changeFilter('Past')
                        }}
                        id='Past'
                        className={`${styles['filter-chip']}`}>
                        Past
                    </button>
                </div>
                <div className={styles.divider}></div>  
            </div>
            <div className={`${inter.className} ${styles['event-feed-wrapper']}`}>
                { isPending ?
                    <>
                        <Skeleton variant="rectangular" animation='wave' width="100%" height="2rem" />
                        <Skeleton variant="rectangular" animation='wave' width="100%" height="2rem" />
                        <Skeleton variant="rectangular" animation='wave' width="100%" height="2rem" />
                        <Skeleton variant="rectangular" animation='wave' width="100%" height="2rem" />
                    </>
                    :
                    <>
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
                    </>
                }
            </div>
        </main>
    )
}