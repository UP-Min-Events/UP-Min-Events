'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useUserTypeContext } from '../../providers/UserTypeProvider'
import { useIsScanningContext } from '../../providers/IsScanningProvider'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import upLogo from '@/public/uplogo.png'
import Image from 'next/image'

import { auth, db } from '@/firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { collection, getDocs, } from 'firebase/firestore'

const inter = Inter({ subsets: ['latin']})

export default function LoginOps(){
    
    const router = useRouter()
    const { userType, updateUserType } = useUserTypeContext()
    const { isScanning, eventID } = useIsScanningContext()
    const [isLoading, setIsLoading] = useState(false)

    const getAttendees = async (userid : string) => {
        const attendeesdb = collection(db, 'attendees')
        const attendees = await getDocs(attendeesdb)
        const userExists = attendees.docs.some(doc => doc.id === userid)
        
        if (!attendees.docs || attendees.docs.length === 0 || !userExists) {
            router.push('/user-onboarding')
        } else {
            if (isScanning) {
                router.push(`/scan/${eventID}`)
            } else {
                router.push('/')
            }
        } 
    }
    
    const getOrganizers = async (userid: string) => {
        const organizersdb = collection(db, 'organizers')
        const organizers = await getDocs(organizersdb)
        const userExists = organizers.docs.some(doc => doc.id === userid)
        if (!organizers.docs || organizers.docs.length === 0 || !userExists) {
            router.push('/user-onboarding')
        } else {
            router.push('/')
        }
    }

    const SignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ 
            hd: "up.edu.ph",
        });
        
        signInWithPopup(auth, provider).then((result) => {
            const userid = result.user.uid;
            if (userType === 'attendee') {
                getAttendees(userid);
            } else if (userType === 'organizer') {
                getOrganizers(userid)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <div className={styles['page-wrapper']}>
            <div className={`${styles['login-header']} ${inter.className}`}>
                <Image className={styles.logo} src={upLogo} alt="UPMin Logo" width={175} height={142} priority/>
                <h1>Events</h1>
                <p>Know what&apos;s happening.</p>
            </div>

            <div className={`${styles['login-body']} ${inter.className}`}>
                <p>Log in as:</p>
                <button className={`${inter.className} ${styles['login-button']}`} onClick={() => {
                    updateUserType('attendee')
                    setIsLoading(true)
                    SignIn()
                }}> 
                    Attendee
                </button>
                <button className={`${inter.className} ${styles['login-button']}`} onClick={() => {
                    updateUserType('organizer')
                    setIsLoading(true)
                    SignIn()
                }}> 
                    Organizer
                </button>
            </div>
        </div>           
    )
}