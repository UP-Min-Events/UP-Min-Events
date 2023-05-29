'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useUserTypeContext } from '../../providers/UserTypeProvider'

import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const inter = Inter({ subsets: ['latin']})

interface userDetails {
    firstName: string
    lastName: string
    studentNumber: string
}

export default function UserInfo(){

    const [userDetails, setUserDetails] = useState<userDetails>({ firstName: '', lastName: '', studentNumber: '' })
    const [user] = useAuthState(auth)
    const { userType } = useUserTypeContext()

    const fullName = userDetails.firstName + ' ' + userDetails.lastName
    
    const getUserDetails = async () => {
        if (userType === 'attendee') {
            const docSnap = await getDoc(doc(db, 'attendees', `${user?.uid}`))
            
            if (docSnap.exists()) {
                setUserDetails(docSnap.data() as userDetails)
            }
        } else {
            const docSnap = await getDoc(doc(db, 'organizers', `${user?.uid}`))
            
            if (docSnap.exists()) {
                setUserDetails(docSnap.data() as userDetails)
            }
        }
    
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <>
            {user && (
                <div className={`${inter.className} ${styles.headerContainer}`}>

                    <div className={styles.nav}>
                        <Link href="/"> 
                            <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} /> 
                        </Link> 
                    </div>

                    <div className={styles.header}>
                        <Image className={styles.img} src={user?.photoURL ?? ''} alt={user?.displayName || `User Avatar`} width="100" height="100" />
                        <h2> {fullName} </h2>
                        <p> {user.email} </p>
                        <p> {userDetails.studentNumber} </p>
                    </div>
                </div>
            )}
        </>
    )
}