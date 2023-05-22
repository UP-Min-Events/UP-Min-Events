'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '../../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Page1 from './Page1'
import Page2 from './Page2'

export default function Ops() {

    const router = useRouter()
    const [user] = useAuthState(auth)
    const dbInstance = collection(db, 'events')

    const [page, setPage] = useState<number>(1)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const [eventName, setEventName] = useState<string>('')
    const [eventHost, setEventHost] = useState<string>('')
    const [eventDesc, setEventDesc] = useState<string>('')
    const [eventDate, setEventDate] = useState<string>('')
    const [eventStartTime, setEventStartTime] = useState<string>('')
    const [eventEndTime, setEventEndTime] = useState<string>('')
    const [eventVenue, setEventVenue] = useState<string>('')
    const [eventVisibility, setEventVisibility] = useState<string>('')

    const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value)
    }

    const handleEventHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventHost(e.target.value)
    }

    const handleEventDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEventDesc(e.target.value)
    }

    const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventDate(e.target.value)
    }

    const handleEventStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventStartTime(e.target.value)
    }

    const handleEventEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventEndTime(e.target.value)
    }

    const handleEventVenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventVenue(e.target.value)
    }

    const handleEventVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEventVisibility(e.target.value)
    }

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const disableButton = () => {
        setIsButtonDisabled(true)
    }

    const createEvent = async () => {

        if (eventName === '' || eventHost === '' || eventDesc === '' || eventDate === '' || eventStartTime === '' || eventEndTime === '' || eventVenue === '' || eventVisibility === '') {
            alert('Please fill in all fields')
            return
        }

        const ref = await addDoc(dbInstance, {
            name: eventName,
            host: eventHost,
            desc: eventDesc,
            date: eventDate,
            startTime: eventStartTime,
            endTime: eventEndTime,
            venue: eventVenue,
            visibility: eventVisibility,
            attendees: [],
            owner: user?.uid
        })

        const id = ref.id

        setEventName('')
        setEventHost('')
        setEventDesc('')
        setEventDate('')
        setEventStartTime('')
        setEventEndTime('')
        setEventVenue('')
        setEventVisibility('')

        disableButton()
        router.push(`/event/${id}`)
    }

    return (
        <>
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
                    isButtonDisabled={isButtonDisabled}
                    eventDate={eventDate}
                    eventStartTime={eventStartTime}
                    eventEndTime={eventEndTime}
                    eventVenue={eventVenue}
                    eventVisibility={eventVisibility}
                    handleEventDateChange={handleEventDateChange}
                    handleEventStartTimeChange={handleEventStartTimeChange}
                    handleEventEndTimeChange={handleEventEndTimeChange}
                    handleEventVenueChange={handleEventVenueChange}
                    handleEventVisibilityChange={handleEventVisibilityChange}
                />
            }
        </>
    )
}