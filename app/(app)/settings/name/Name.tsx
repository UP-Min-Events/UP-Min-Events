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
}

export default function Name() {

    const [user] = useAuthState(auth)
    const id = user?.uid
    const { userType } = useUserTypeContext()

    // MUI Snackbar
    const [open, setOpen] = useState(false)
    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    const [input, setInput] = useState<Name>({ firstName: '', lastName: ''})

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
                    <button className={styles['save-setting']} onClick={() => { updateDetail() }}> Save </button>
            </div>
            <div className={styles['form-body']}>
                <div className={styles['form-section']}>
                    <div className={styles['form-item']}>
                        <p className={styles['input-label']}> First Name </p>
                            <input className={styles['input-element']} value={input.firstName} onChange={e => setInput({ ...input, firstName: e.target.value })} placeholder={input.firstName} />
                    </div>

                    <div className={styles['form-item']}>
                        <p className={styles['input-label']}> Last Name </p>
                        <input className={styles['input-element']} value={input.lastName} onChange={e => setInput({ ...input, lastName: e.target.value })} placeholder={input.lastName} />
                    </div>
                </div>
            </div>
        </div>
    )
}