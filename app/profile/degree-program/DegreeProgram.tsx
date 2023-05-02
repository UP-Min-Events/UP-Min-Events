'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { auth, db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function DegreeProgram(){

    const [user] = useAuthState(auth)
    const id = user?.uid

    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState<string>('CS')

    const getDetail = async () => {
        const docRef = doc(db, 'attendees', id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
            setInput(docSnap.data()?.program)
        } 

    }

    const updateDetail = async () => {
        const docRef = doc(db, 'attendees', id)
        await updateDoc(docRef, {
            program: input
        })
    }

    useEffect(() => {
        getDetail()
    }, [])
 
    return (
        <div>
            <div>
                <Link href='/profile'>Back</Link>
                <h1>Degree Program</h1>
            </div>
            <div>
                { toggle ?
                    <div>
                        <select value={input} onChange={e => setInput(e.target.value)} placeholder={input}>
                            <option value='Computer Science'>Computer Science</option>
                            <option value='Applied Mathematics'>Applied Mathematics</option>
                            <option value='Biology'>Biology</option>
                            <option value='Food Technology'>Food Technology</option>
                        </select>
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