'use client'

import Attendee from './Attendee'

import { useEffect, useState } from 'react'

import { db } from '@/firebaseConfig'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

interface Attendee {
    firstName: string
    lastName: string
    studentNumber: string
    id: string
}

export default function Attendees() {

    const attendeesdb = collection(db, 'attendees')
    const [attendees, setAttendees] = useState<Attendee[]>([])

    const deleteItem = async (id: string): Promise<void> => {
        const docRef = doc(db, 'attendees', id)
        await deleteDoc(docRef)
        getAttendees()
    }


    const getAttendees = async () => {
        const querySnapshot = await getDocs(attendeesdb)
        const attendees: Attendee[] = []

        querySnapshot.forEach((doc) => {
            attendees.push({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                studentNumber: doc.data().studentNumber,
                id: doc.id
            })
        })

        setAttendees(attendees)
    }

    useEffect(() => {
        getAttendees()
    }, [])

    return(
        <div>
            <div>
                <h1>Attendees</h1>
            </div>
            <div>
                {attendees.map((attendee) => {
                    return (
                        <Attendee
                            key={attendee.id}
                            firstName={attendee.firstName}
                            lastName={attendee.lastName}
                            studentNumber={attendee.studentNumber}
                            id={attendee.id}
                            deleteItem={deleteItem}
                        />
                        )
                    })}
            </div>
        </div>
    )
}