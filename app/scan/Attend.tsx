'use client'

import { useState } from 'react'
import { auth, db } from '../../firebaseConfig'
import { doc, getDoc, updateDoc} from 'firebase/firestore'


export default function Attend(){

    const user = auth.currentUser

    const [eventAttending, setEventAttending] = useState<string>('')

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
    }

    return (
        <div>
            <h1>Attend</h1>
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