'use client'

import Organizer from './Organizer'

import { useEffect, useState } from 'react'

import { db } from '@/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

interface Organizer {
    firstName: string
    lastName: string
    id: string
}

export default function Organizers() {

    const organizersdb = collection(db, 'organizers')
    const [organizers, setOrganizers] = useState<Organizer[]>([])

    const getOrganizers = async () => {
        const querySnapshot = await getDocs(organizersdb)
        const organizers: Organizer[] = []

        querySnapshot.forEach((doc) => {
            organizers.push({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                id: doc.id
            })
        })

        setOrganizers(organizers)
    }

    useEffect(() => {
        getOrganizers()
    }, [])

    return(
        <div>
            <div>
                <h1>Organizers</h1>
            </div>
            <div>
                {organizers.map((organizer) => {
                    return (
                        <Organizer
                        key={organizer.id}
                        firstName={organizer.firstName}
                        lastName={organizer.lastName}
                        id={organizer.id}
                        />
                        )
                    })}
            </div>
        </div>
    )
}