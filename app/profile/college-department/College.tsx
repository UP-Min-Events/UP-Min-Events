'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { auth, db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function College(){

    const [user] = useAuthState(auth)
    const id = user?.uid

    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState<string>('CS')

    const getDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
            setInput(docSnap.data()?.college)
        } 

    }

    const updateDetail = async () => {
        const docRef = doc(db, 'attendees', `${id}`)
        await updateDoc(docRef, {
            college: input
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
                            <option value='csm'>College of Science and Mathematics</option>
                            <option value='chss'>College of Humanities and Social Sciences</option>
                            <option value='som'>School of Management</option>
                            <option value='dhk'>Department of Human Kinetics</option>
                        </select>
                        <button onClick={() => {
                            updateDetail()
                            setToggle(false)
                        }}>Save</button> 
                    </div> 
                    : 
                    <p onClick={() => setToggle(true)}>
                        {
                            input === 'csm' ? 'College of Science and Mathematics' :
                            input === 'chss' ? 'College of Humanities and Social Sciences' :
                            input === 'som' ? 'School of Management' :
                            input === 'dhk' ? 'Department of Human Kinetics' : 'No Data Available'
                        }
                    </p> 
                }
            </div>
        </div>
    )
}