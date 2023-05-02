'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { auth, db } from '../../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function DegreeProgram(){

    const [user] = useAuthState(auth)
    const id = user?.uid

    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState('CS')


    useEffect (() => {

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
                        <input type='text' value={input} onChange={e => setInput(e.target.value)} placeholder={input} />
                        <button onClick={
                            () => setToggle(false)
                        }>Save</button> 
                    </div> 
                    : 
                    <p onClick={e => setToggle(true)}>{input}</p> 
                }
            </div>
        </div>
    )
}