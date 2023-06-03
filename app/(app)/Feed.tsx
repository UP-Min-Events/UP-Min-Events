'use client'

import styles from './page.module.scss'
import All from './Events-All'
import Live from './Events-Live'
import Upcoming from './Events-Upcoming'
import Past from './Events-Past'
import MyEvents from './Events-MyEvents'
import OtherEvents from './Events-OtherEvents'

import { Inter } from 'next/font/google'
import { useState, useEffect, useTransition } from 'react'
import { useUserTypeContext } from '@/app/providers/UserTypeProvider'

import { CircularProgress, Skeleton } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Feed() {

    const { userType } = useUserTypeContext()
    const [filter, setFilter] = useState<string>('')
    const [isPending, startTransition] = useTransition()

    // const getEvents = async () => {
    //     const querySnapshot = await getDocs(dbInstance)
    //     const events: Event[] = []

    //     querySnapshot.forEach((doc) => {
    //         if (doc.data().visibility === 'Private' && userType === 'attendee') return
    //         if (filter === 'MyEvents') {
    //             const coOwners = doc.data().coOwners;
    //             if (coOwners !== undefined && coOwners.includes(user?.email)) {
    //                 // The user is a co-owner of the event, display it
    //                 events.push({
    //                     name: doc.data().name,
    //                     date: doc.data().date,
    //                     startTime: doc.data().startTime,
    //                     endTime: doc.data().endTime,
    //                     venue: doc.data().venue,
    //                     id: doc.id
    //                 })
    //                 return
    //             } else if (doc.data().owner !== user?.uid) return
    //         } else if (filter === 'Live') {
    //             const eventDate = new Date(doc.data().date);
    //             dateToday.setHours(0, 0, 0, 0); // Set the time to 00:00:00 for accurate comparison

    //             if (eventDate.getFullYear() === dateToday.getFullYear() &&
    //                 eventDate.getMonth() === dateToday.getMonth() &&
    //                 eventDate.getDate() === dateToday.getDate()) {
    //                 // The event is happening dateToday, display it
    //             } else {
    //                 return; // Skip events that are not happening dateToday
    //             }
    //         } else if (filter === 'Upcoming') {
    //             const eventDate = new Date(doc.data().date)
    //             if (eventDate < dateToday) return
    //         } else if (filter === 'Past') {
    //             const eventDate = new Date(doc.data().date)
    //             if (eventDate > dateToday) return
    //             if (eventDate.getFullYear() === dateToday.getFullYear() &&
    //                 eventDate.getMonth() === dateToday.getMonth() &&
    //                 eventDate.getDate() === dateToday.getDate()) {
    //                 return
    //             }
    //         }

    //         events.push({
    //             name: doc.data().name,
    //             date: doc.data().date,
    //             startTime: doc.data().startTime,
    //             endTime: doc.data().endTime,
    //             venue: doc.data().venue,
    //             id: doc.id
    //         })

    //         // Displaying Co-Owned Events using firestore query
    //         // const coOwnerQuery = query(dbInstance, where('coOwners', 'array-contains', user?.email))
    //         // const coOwnerSnapshot = await getDocs(coOwnerQuery)
      
    //         // coOwnerSnapshot.forEach((doc) => {
    //         //   events.push({
    //         //     name: doc.data().name,
    //         //     date: doc.data().date,
    //         //     startTime: doc.data().startTime,
    //         //     endTime: doc.data().endTime,
    //         //     venue: doc.data().venue,
    //         //     id: doc.id
    //         //   })
    //         // })
    //     })

    //     setEvents(events)
    // }

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
        if (userType === 'organizer') {
            changeFilter('MyEvents')
        } else if (userType === 'attendee') {
            changeFilter('All')
        }
    }, [])

    return (
        <main>
            <div className={styles['header-wrapper']}>
                <div className={`${styles['filter-wrapper']} ${inter.className}`}>
                    {userType === 'organizer' &&
                        <>
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
                            <button
                                onClick={() => {
                                    document.getElementById(filter)?.classList.remove(styles['active'])
                                    changeFilter('OtherEvents')
                                }}
                                id='OtherEvents'
                                className={`${styles['filter-chip']}`}
                            >
                                Other Events
                            </button>
                        </>
                    }
                    {userType === 'attendee' &&
                        <>
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
                        </>
                    }
                </div>
                <div className={styles.divider}></div>
            </div>
            <div className={`${inter.className} ${styles['event-feed-wrapper']}`}>
                {/* { isPending && <CircularProgress color='error' size='6rem' thickness={3.6} />} */}
                { isPending && 
                    <>
                        <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="6.625rem" />
                        <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="6.625rem" />
                        <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="6.625rem" />
                        <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="6.625rem" />
                    </> 
                }
                { filter === 'All' && <All />}
                { filter === 'Upcoming' && <Upcoming />}
                { filter === 'Live' && <Live />}
                { filter === 'Past' && <Past />}
                { filter === 'MyEvents' && <MyEvents />}
                { filter === 'OtherEvents' && <OtherEvents />}
            </div>
        </main>
    )
}