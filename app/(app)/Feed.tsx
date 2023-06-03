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

import { Skeleton } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Feed() {

    const { userType } = useUserTypeContext()
    const [filter, setFilter] = useState<string>('')
    const [isPending, startTransition] = useTransition()

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
                { filter === 'All' && !isPending && userType === 'attendee' && <All />}
                { filter === 'Upcoming' && !isPending && userType === 'attendee' && <Upcoming />}
                { filter === 'Live' && !isPending && userType === 'attendee' && <Live />}
                { filter === 'Past' && !isPending && userType === 'attendee' && <Past />}
                { filter === 'MyEvents' && !isPending && userType === 'organizer' && <MyEvents />}
                { filter === 'OtherEvents' && !isPending && userType === 'organizer' && <OtherEvents />}
            </div>
        </main>
    )
}