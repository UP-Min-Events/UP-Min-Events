'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useUserTypeContext } from '../../providers/UserTypeProvider'
import { useIsScanningContext } from '../../providers/IsScanningProvider'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import upLogo from '@/public/uplogo.png'
import Image from 'next/image'
import { Skeleton } from '@mui/material'

import { auth, db } from '@/firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { collection, getDocs, } from 'firebase/firestore'
import { CollectionReference } from 'firebase/firestore'

const inter = Inter({ subsets: ['latin']})

export default function LoginOps(){
    
    const router = useRouter()
    const { userType, updateUserType } = useUserTypeContext()
    const { isScanning, eventID } = useIsScanningContext()
    const [isLoading, setIsLoading] = useState(false)

    const getAttendees = async ( attendeesdb : CollectionReference, userid : string ) => {
        setIsLoading(true) // Show skeleton while loading
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
    
    const getOrganizers = async (organizersdb : CollectionReference, userid: string) => {
        setIsLoading(true) // Show skeleton while loading
        const organizers = await getDocs(organizersdb)
        const userExists = organizers.docs.some(doc => doc.id === userid)
        if (!organizers.docs || organizers.docs.length === 0 || !userExists) {
            router.push('/user-onboarding')
        } else {
            router.push('/')
        }
    }

    const SignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ hd: "up.edu.ph" });
        
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                const user = result.user
                const userid = user?.uid

                if (userType === 'attendee') {
                    const attendeesdb = collection(db, 'attendees')
                    getAttendees(attendeesdb, userid)
                } else if (userType === 'organizer'){
                    const organizersdb = collection(db, 'organizers')
                    getOrganizers(organizersdb, userid)
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    
    return (
        <div className={styles['page-wrapper']}>
            <div className={`${styles['login-header']} ${inter.className}`}>
                { isLoading ?
                    <>
                        <Skeleton animation='wave' width={175} height={225} />
                        <Skeleton animation='wave' width={125} height={80} />
                        <Skeleton animation='wave' width={175} />
                    </> 
                 : 
                    <>
                        <Image className={styles.logo} src={upLogo} alt="UPMin Logo" width={175} height={142} priority/>
                        <h1>Events</h1>
                        <p>Know what&apos;s happening.</p>
                    </>
                }
            </div>

            <div className={`${styles['login-body']} ${inter.className}`}>
                { isLoading ?
                    <>
                        <Skeleton animation='wave' width={80} />
                        <Skeleton animation='wave' width={200} height={70} />
                        <Skeleton animation='wave' width={200} height={70} />
                    </>
                : 
                    <>
                        <p>Log in as:</p>
                        <button className={`${inter.className} ${styles['login-button']}`} onClick={() => {
                            updateUserType('attendee')
                            SignIn()
                        }}> 
                            Attendee
                        </button>
                        <button className={`${inter.className} ${styles['login-button']}`} onClick={() => {
                            updateUserType('organizer')
                            SignIn()
                        }}> 
                            Organizer
                        </button>
                    </>
                }
            </div>
        </div>           
    )
}