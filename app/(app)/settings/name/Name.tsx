'use client'

import styles from '../page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUserTypeContext } from '@/app/providers/UserTypeProvider'

import { auth, db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Name {
    firstName : string,
    lastName : string,
    yearLevel : string,
    studentNumber: string,
    program: string,
    college: string
}

export default function Name() {

    const [user] = useAuthState(auth)
    const id = user?.uid
    const { userType } = useUserTypeContext()

    const [toggleFirst, setToggleFirst] = useState(false)
    const [toggleLast, setToggleLast] = useState(false)
    const [toggleYear, setToggleYear] = useState(false)
    const [toggleStudNum, setToggleStudNum] = useState(false)
    const [toggleProgram, setToggleProgram] = useState(false)
    const [toggleCollege, setToggleCollege] = useState(false)
    
    const [input, setInput] = useState<Name>({ firstName: '', lastName: '', yearLevel: '', studentNumber: '', program: '', college: '' })

    const getDetail = async () => {
        let collection

        if (userType === 'attendee') {
            collection = 'attendees'
        } else if (userType === 'organizer') {
            collection = 'organizers'
        }

        const docSnap = await getDoc(doc(db, `${collection}`, `${id}`))

        if (docSnap.exists()) {
            setInput(docSnap.data() as Name)
        }
    }

    const updateDetail = async () => {
        let collection
        if (userType === 'attendee') {
            collection = 'attendees'
        } else if (userType === 'organizer') {
            collection = 'organizers'
        }

        const docRef = doc(db, `${collection}`, `${id}`)
        await updateDoc(docRef, {
            firstName: input.firstName,
            lastName: input.lastName,
            yearLevel: input.yearLevel,
            studentNumber: input.studentNumber,
            program: input.program,
            college: input.college
        })
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <div>
            <div className={styles.nav}>
                    <Link href="/settings"> 
                        <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} /> 
                    </Link> 
                    <button className={styles['save-setting']}> Save </button>
            </div>

            <div className={styles['form-body']}>
                <div className={styles['form-section']}>
                    <div className={styles['form-item']}>
                        <p className={styles['input-label']}> First Name </p>
                        <div className={styles['input-wrapper']}>
                            { toggleFirst ?
                                <div>
                                    <input className={styles['input-element']} value={input.firstName} onChange={e => setInput({ ...input, firstName: e.target.value })} placeholder={input.firstName} />
                                    <button onClick={() => {
                                        updateDetail()
                                        setToggleFirst(false)
                                    }}>Save</button>
                                </div>
                                :
                                <p onClick={() => setToggleFirst(true)}>{input.firstName}</p>
                            }
                        </div>
                    </div>

                    <div className={styles['form-item']}>
                        <p className={styles['input-label']}> Last Name </p>
                        <div className={styles['input-wrapper']}>
                        { toggleLast ?
                            <div>
                                <input className={styles['input-element']} value={input.lastName} onChange={e => setInput({ ...input, lastName: e.target.value })} placeholder={input.lastName} />
                                <button onClick={() => {
                                    updateDetail()
                                    setToggleLast(false)
                                }}>Save</button>
                            </div>
                            :
                            <p onClick={() => setToggleLast(true)}>{input.lastName}</p>
                        }
                        </div>
                    </div>
                                    
                </div>
            </div>
        </div>
    )
}