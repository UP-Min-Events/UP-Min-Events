'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useIsScanningContext } from '@/app/providers/IsScanningProvider'

interface AttendanceDetails {
    attendee: string;
    dateTime: string;
}

export default function ProcessOps({ id }: { id: string }) {

    const [user, loading] = useAuthState(auth)
    const router = useRouter()
    const { updateIsScanning, updateEventID } = useIsScanningContext()

    const checkIfAlreadyAUser = async () => {
        const attendeeRef = doc(db, 'attendees', `${user?.uid}`)
        await getDoc(attendeeRef).then(
            (docSnap) => {
                if (docSnap.exists()) {
                    processAttendance(id)
                } else {
                    updateIsScanning(true)
                    updateEventID(id)
                    router.push('/login')
                }
            }
        )
    }

    const getTime = () => {

        const currentDate = new Date();

        // Get time components
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        return `${hours}:${minutes}`
    }



    const processAttendance = async (eventId: string) => {

        const attendee = user?.uid
        const eventRef = doc(db, 'events', eventId)
        const eventDoc = await getDoc(eventRef)
        const attendanceDetails = {
            attendee: attendee,
            dateTime: getTime()
        }

        const checkAttendeeExists = (attendees: AttendanceDetails[], name: string | undefined) => {
            return attendees.some((details) => details.attendee === name);
        };
          

        if (eventDoc.exists()) {
            const attendees = eventDoc.data().attendees
            

            if (checkAttendeeExists(attendees, attendee)) {
                window.alert('You are already attending this event!')
                router.push(`/event/${eventId}`)
                return
            }

            attendees.push(attendanceDetails)
            console.log(attendanceDetails)

            await updateDoc(eventRef, {
                attendees: attendees
            })

            window.alert('Attendance recorded!')
            router.push(`/event/${eventId}`)
        } else {
            window.alert('No such event!')
            router.push('/')
        }
    }

    useEffect(() => {
        if (user && !loading) {
            updateIsScanning(false)
            checkIfAlreadyAUser()
        }
    }, [loading])

    return (
        <div>
            <h1>Processing...</h1>
        </div>
    )
}