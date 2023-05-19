'use client'

import styles from '../page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUserTypeContext } from '@/app/(app)/providers/UserTypeProvider'

import { auth, db } from '@/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function College(){

    const [user] = useAuthState(auth)
    const id = user?.uid
    const { userType } = useUserTypeContext()

    let collection: string 
    
    if (userType === 'attendee') {
        collection = 'attendees'
    } else if (userType === 'organizer') {
        collection = 'organizers'
    }

    const [toggle, setToggle] = useState(false)
    const [input, setInput] = useState<string>('CS')


    const getDetail = async () => {
        const docRef = doc(db, `${collection}`, `${id}`)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setInput(docSnap.data()?.college)
        } 

    }

    const updateDetail = async () => {
        const docRef = doc(db, `${collection}`, `${id}`)
        await updateDoc(docRef, {
            college: input
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
                <div className={styles['form-item']}>
                    <p className={styles['input-label']}> College </p>
                    <div className={styles['input-wrapper']}>
                        { toggle ?
                            <div>
                                <select className={styles['input-element']} value={input} onChange={e => setInput(e.target.value)} placeholder={input}>
                                    <option value='csm'>College of Science and Mathematics</option>
                                    <option value='chss'>College of Humanities and Social Sciences</option>
                                    <option value='som'>School of Management</option>
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
                                    input === 'som' ? 'School of Management' : 'No Data Available'
                                }
                            </p> 
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}