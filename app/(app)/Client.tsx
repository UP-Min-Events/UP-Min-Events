'use client'

import styles from './page.module.scss'
import { Inter } from 'next/font/google'

import Header from './Header'
import Menu from './Menu'
import Feed from "./Feed"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUserTypeContext } from '@/app/providers/UserTypeProvider'

import { auth, db } from "../../firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

const inter = Inter({ subsets: ['latin']})

export default function Client() {

    const [user, loading] = useAuthState(auth)
    const router = useRouter()
    const { userType } = useUserTypeContext()

    const checkUser = async (): Promise<boolean> => {
        if (userType === 'attendee') {
            const ref = doc(db, 'attendees', `${user?.uid}`)
            const docSnap = await getDoc(ref)

            if (docSnap.exists()) {
                const data = docSnap.data()

                if (data?.firstName && data?.lastName && data?.studentNumber && data?.yearLevel && data?.college && data?.program) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else if (userType === 'organizer') {
            const ref = doc(db, 'organizers', `${user?.uid}`)
            const docSnap = await getDoc(ref)

            if (docSnap.exists()) {
                const data = docSnap.data()

                if (data?.firstName && data?.lastName && data?.emailAddress && data?.college && data?.affiliatedOrganization) {
                    return true
                } else {
                    return false
                }
            } else { 
                return false
            }
        }

        return false
    }

    useEffect(() => {

        if (!user && !loading) {
            router.push("/login")
        }

        const userValid = checkUser()
        if (!userValid) {
            router.push("/onboarding")
        }

    }, [user, loading])

    return (
        <>
            {user && (
                <div className={`${inter.className} ${styles.container}`}>
                    <Header />
                    <Feed />  
                    <Menu />
                </div>
            )}
        </>
    )
      
}
