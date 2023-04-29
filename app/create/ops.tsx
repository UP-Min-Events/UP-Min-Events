'use client'

import { Inter } from 'next/font/google'
import { useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import Page1 from './Page1'
import Page2 from './Page2'

const inter = Inter({ subsets: ['latin'] })

export default function Ops() {

    const dbInstance = collection(db, 'events')
    const user = auth.currentUser

    const [page, setPage] = useState<number>(1)

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

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
    }

    return (
        <div className={inter.className}>
            <div >
                {page === 1 ? <Page1 nextPage={nextPage} /> : <Page2 createEvent={createEvent} prevPage={prevPage}/>}
            </div>
        </div>
    )
}