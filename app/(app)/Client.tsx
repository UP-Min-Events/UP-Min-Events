'use client'

import styles from './page.module.scss'
import { Inter } from 'next/font/google'

import Header from './Header'
import Menu from './Menu'
import Feed from "./Feed"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useUserTypeContext } from '@/app/providers/UserTypeProvider'

import { auth, db } from "../../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

const inter = Inter({ subsets: ['latin']})

export default function Client() {

    const [user, loading] = useAuthState(auth)
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()
    const { userType } = useUserTypeContext()

    const checkUser = async () => {
        if (userType === 'attendee') {
            
            const ref = doc(db, 'attendees', `${user?.uid}`)
            const docSnap = await getDoc(ref)

            if (docSnap.exists()) {
                const data = docSnap.data()

                if (!data?.firstName && !data?.lastName && !data?.studentNumber && !data?.yearLevel && !data?.college && !data?.program) {
                    router.push("/login")
                } else {
                    setShow(true)
                }
            } else {
                router.push("/login")
            }
        } else if (userType === 'organizer') {
            const ref = doc(db, 'organizers', `${user?.uid}`)
            const docSnap = await getDoc(ref)

            if (docSnap.exists()) {
                const data = docSnap.data()

                if (!data?.firstName && !data?.lastName && !data?.emailAddress && !data?.college && !data?.affiliatedOrganization) {
                    router.push("/login")
                } else {
                    setShow(true)
                }
            } else { 
                router.push("/login")
            }
        }

    }

    useEffect(() => {
        if (!user && !loading) {
            router.push("/login")
        }

        checkUser()
    }, [user, loading])

    return (
        <>
            {user && show && (
                <div className={`${inter.className} ${styles.container}`}>
                    <Header />
                    <Feed />  
                    <Menu />
                </div>
            )}
        </>
    )
      
}
