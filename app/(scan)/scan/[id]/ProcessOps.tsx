'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useIsScanningContext } from '@/app/(app)/providers/IsScanningProvider'

export default function ProcessOps({ id } : { id: string }) {

    const [user] = useAuthState(auth)
    const router = useRouter()
    const { updateIsScanning } = useIsScanningContext()

    const checkIfAlreadyAUser = async () => {
        const attendeeRef = doc(db, 'attendees', `${user?.uid}`)
        const attendeeDoc = await getDoc(attendeeRef)

        if (attendeeDoc.exists()) {
            processAttendance(id)
        } else {
            updateIsScanning(true)
            router.push('/login')
        }
    }

    const processAttendance = async (eventId: string) => {

        const attendee = user?.uid
        const eventRef = doc(db, 'events', eventId)
        const eventDoc = await getDoc(eventRef)

        if (eventDoc.exists()) {
            const attendees = eventDoc.data().attendees

            if (attendees.includes(attendee)) {
                window.alert('You are already attending this event!')
                return
            }

            attendees.push(attendee)

            await updateDoc(eventRef, {
                attendees: attendees
            })

            window.alert('Attendance recorded!')
            router.push(`/event/${eventId}`)
        } else {
            window.alert('No such event!')
        }
    }

    useEffect(() => {
        checkIfAlreadyAUser()
    }, [])

    return (
        <div>
            <h1>Processing...</h1>
        </div>
    )
}