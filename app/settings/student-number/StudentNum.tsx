'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { auth, db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function StudentNum() {

    const [user] = useAuthState(auth)
    const id = user?.uid

    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState<string>('')

    const getDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setInput(docSnap.data()?.studentNumber)
        }
    }

    const updateDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        await updateDoc(docRef, {
            studentNumber: input
        })
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <div>
            <div>
                <Link href='/settings'>Back</Link>
                <h1>Student Number</h1>
            </div>
            <div>
                { toggle ?
                    <div>
                        <input value={input} onChange={e => setInput(e.target.value)} placeholder={input} />
                        <button onClick={() => {
                            updateDetail()
                            setToggle(false)
                        }}>Save</button>
                    </div>
                    :
                    <p onClick={() => setToggle(true)}>{input}</p>
                }
            </div>
        </div>
    )
}