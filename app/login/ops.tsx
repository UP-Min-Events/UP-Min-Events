'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useUserTypeContext } from '../UserTypeProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { auth, db } from '../../firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

import { Stack, Button, Container, Divider } from '@mui/material'
import upLogo from '../../public/uplogo.png'

const inter = Inter({ subsets: ['latin']})

export default function Ops(){
    
    const [user] = useAuthState(auth)
    const router = useRouter()
    const { userType, updateUserType } = useUserTypeContext()

    const getAttendees = async (attendeesdb) => {
        const attendees = await getDocs(attendeesdb)
        const userExists = attendees.docs.some(doc => doc.id === user.uid)
        if (!attendees.docs || attendees.docs.length === 0 || !userExists) {
            const docRef = doc(db, 'attendees', user.uid)
            await setDoc(docRef, { events: [] })
            router.push('/user-onboarding')
        } else {
            router.push('/')
        } 
    }
    
    const getOrganizers = async (organizersdb) => {
        const organizers = await getDocs(organizersdb)
        if (!organizers || organizers.docs.length === 0 || !organizers.docs) {
            const docRef = doc(db, 'organizers', user.uid)
            await setDoc(docRef, { events: [] })
            //router.push('/user-onboarding')
        }

        router.push('/')
    }

    const SignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ hd: "up.edu.ph" });
        
        signInWithPopup(auth, provider)
    }

    useEffect(() => {

        if(user) {
            if (userType === 'attendee') {

                const attendeesdb = collection(db, 'attendees')
                getAttendees(attendeesdb)
                
            } else if (userType === 'organizer') {

                const organizersdb = collection(db, 'organizers')
                getOrganizers(organizersdb)

            } else {
                router.push('/') 
            }
        }
    }, [user])
    
    return (
        <Container maxWidth={false}
            sx={{ 
                my: 'auto',
                mx: 'auto',
                minHeight: '100vh'
            }}
        >

            <div className={styles.loginHeader}>

                <Image className={styles.logo}
                    src={upLogo}
                    alt="UPMin Logo"
                    width={175}
                    height={142.5}
                />

                <h1>Events</h1>
                <p>Know what&apos;s happening.</p>

                <Divider variant="middle" sx={{ width: '75%', mx: 'auto' }} />
            </div>

            <Stack spacing={1} className={`${inter.className} ${styles.loginBody}`} sx={{ display: 'flex', alignItems: 'center' }}>

                <p> Log in as: </p>
                <Button variant="text" className={inter.className} onClick={() => {
                    updateUserType('attendee')
                    SignIn()
                }} 
                    sx={{
                        display: 'flex',
                        backgroundColor: '#a70000',
                        color: '#fff',
                        fontWeight: 'bold',
                        width: '12em',
                        borderRadius: '1em'
                    }}>
                    Attendee
                </Button>
                <Button variant="text" className={inter.className} onClick={() => {
                    updateUserType('organizer')
                    SignIn()
                }}
                    sx={{
                        display: 'flex',
                        backgroundColor: '#a70000',
                        color: '#fff',
                        fontWeight: 'bold',
                        width: '12em',
                        borderRadius: '1em'
                    }}>
                    Organizer
                </Button> 
            </Stack>

        </Container>
    )
}