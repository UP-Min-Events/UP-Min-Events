'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { auth, db } from '../../../firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Organization(){

    const [user] = useAuthState(auth)
    const id = user?.uid

    const [addToggle, setAddToggle] = useState(false)
    const [newOrg, setNewOrg] = useState('')
    const [organizations, setOrganizations] = useState<[]>([])
    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState<string>('')

    const getDetail = async () => {
        const docRef = doc(db, 'organizers', `${id}`)
        const docSnap = await getDoc(docRef)

        const array = []
        docSnap.data()?.affiliatedOrganization.forEach(organization => {
            array.push(organization)
        })      
        console.log(docSnap.data()?.affiliatedOrganization)
        setOrganizations(array)
        console.log(organizations)
    }

    const updateDetail = async () => {
        const docRef = doc(db, 'organizers', `${id}`)
        await updateDoc(docRef, {
            affiliatedOrganization: organizations
        })
        getDetail()
    }

    useEffect(() => {
        getDetail()
        console.log('use effect', organizations)
    }, [])

    return (
        <div>
            <div>
                <Link href='/settings'>Back</Link>
                <h1>Organization</h1>
            </div>
            <div>
                <div>
                    {
                        organizations.map((organization, index) => {
                            return (
                                <div key={index}>
                                    { toggle ?
                                        <>
                                            <input value={input} onChange={e => setInput(e.target.value)} placeholder={organizations[index]} />
                                            <button onClick={() => {
                                                setOrganizations(organizations.map((organization, i) => i === index ? input : organizations[i]))
                                                updateDetail()
                                                setToggle(false)
                                                setInput('')
                                            }}>Save</button>
                                        </>
                                        :
                                        <p onClick={() => setToggle(true)}>{organization}</p>
                                    }
                                    <button onClick={() => {
                                        setOrganizations(organizations.filter((organization, i) => i !== index))
                                    }}>Remove</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    { addToggle ?
                        <>
                            <input value={newOrg} onChange={e => setNewOrg(e.target.value)} placeholder='Organization' />
                            <button onClick={() => {
                                console.log(organizations, newOrg)
                                setOrganizations([...organizations, newOrg])
                                updateDetail()
                                setAddToggle(false)
                                setNewOrg('')
                            }}>Add</button>
                        </>
                        :
                        <button onClick={() => setAddToggle(true)}>Add Organization</button>
                    }
                </div>
             
            </div>
        </div>
    )
}