'use client'

import Event from './Event'
import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import { useState, useEffect, useTransition } from 'react'
import { useUserTypeContext } from './providers/UserTypeProvider'

import { db, auth } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import CircleLoading from './loadingui/CircleLoading'

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
    const [filter, setFilter] = useState<string>('All')
    const [isPending, startTransition] = useTransition()
    const [user] = useAuthState(auth)
    const { userType } = useUserTypeContext()

    const dateToday = new Date()

    const getEvents = async () => {
        const querySnapshot = await getDocs(dbInstance)
        const events: Event[] = []
        querySnapshot.forEach((doc) => {
            if (doc.data().visibility === 'Private') return
            if (userType === 'organizer' && doc.data().owner !== user?.uid) return
            
            if (filter === 'Live') {
                const eventDate = new Date(doc.data().date);
                dateToday.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison
            
                if (eventDate.getFullYear() === dateToday.getFullYear() &&
                    eventDate.getMonth() === dateToday.getMonth() &&
                    eventDate.getDate() === dateToday.getDate()) {
                    // The event is happening dateToday, display it
                } else {
                    return; // Skip events that are not happening dateToday
                }
            }            

            if (filter === 'Upcoming') {
                const eventDate = new Date(doc.data().date)
                if (eventDate < dateToday) return
            }

            if (filter === 'Past') {
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

        startTransition(() => {
            setFilter(filter)
        })
    }

    useEffect(() => {
        getEvents()
    }, [filter])

    return(
        <main>
            <div className={styles['header-wrapper']}>
                <div className={`${styles['filter-wrapper']} ${inter.className}`}>
                    <button 
                        onClick={() => {
                            document.getElementById(filter)?.classList.remove(styles['active'])
                            changeFilter('All')
                        }}
                        id='All'
                        className={`${styles['filter-chip']} ${styles['active']}`}>
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
                    // <Skeleton variant="rectangular" animation='wave' width="100%" height="15rem" />
                    <CircleLoading />
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