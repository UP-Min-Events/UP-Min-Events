'use client'

import { Inter } from 'next/font/google'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Page1 from './Page1'
import Page2 from './Page2'

const inter = Inter({ subsets: ['latin'] })

export default function Ops() {

    const router = useRouter()
    const [user] = useAuthState(auth)
    const dbInstance = collection(db, 'events')

    const [page, setPage] = useState<number>(1)
    const [eventName, setEventName] = useState<string>('')
    const [eventHost, setEventHost] = useState<string>('')
    const [eventDesc, setEventDesc] = useState<string>('')
    const [eventDate, setEventDate] = useState<string>('')
    const [eventTime, setEventTime] = useState<string>('')
    const [eventVenue, setEventVenue] = useState<string>('')

    const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value)
    }

    const handleEventHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventHost(e.target.value)
    }

    const handleEventDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventDesc(e.target.value)
    }

    const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventDate(e.target.value)
    }

    const handleEventTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventTime(e.target.value)
    }

    const handleEventVenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventVenue(e.target.value)
    }

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const createEvent = async () => {
        const ref = await addDoc(dbInstance, {
            name: eventName,
            host: eventHost,
            desc: eventDesc,
            date: eventDate,
            time: eventTime,
            attendees: [],
            owner: user?.uid
        })

        const id = ref.id

        setEventName('')
        setEventHost('')
        setEventDesc('')
        setEventDate('')
        setEventTime('')
        setEventVenue('')

        router.push(`/event/${id}`)
    }

    return (
        <div className={inter.className}>
            <div >
                {page === 1 ? 
                    <Page1 
                        nextPage={nextPage}
                        eventName={eventName}
                        eventHost={eventHost}
                        eventDesc={eventDesc}
                        handleEventNameChange={handleEventNameChange}
                        handleEventHostChange={handleEventHostChange}
                        handleEventDescChange={handleEventDescChange}
                    /> 
                    : 
                    <Page2 
                        createEvent={createEvent} 
                        prevPage={prevPage}
                        eventDate={eventDate}
                        eventTime={eventTime}
                        eventVenue={eventVenue}
                        handleEventDateChange={handleEventDateChange}
                        handleEventTimeChange={handleEventTimeChange}
                        handleEventVenueChange={handleEventVenueChange}
                    />
                }
            </div>
        </div>
    )
}