'use client'

import styles from './page.module.scss'
import { Inter } from 'next/font/google'

import Header from './Header'
import ScanButton from './ScanButton'
import CreateButton from './CreateButton'
import Feed from "./Feed"

import { useUserTypeContext } from "../providers/UserTypeProvider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { auth } from "../../firebaseConfig"
import { useAuthState } from "react-firebase-hooks/auth"

const inter = Inter({ subsets: ['latin']})

export default function Client() {

    const [user, loading] = useAuthState(auth)
    const { userType } = useUserTypeContext()
    const router = useRouter()

    useEffect(() => {
        if (!user && !loading) {
            router.push("/login")
        }

    }, [user, loading])

    return (
        <>
            {user && (
                <div className={`${inter.className} ${styles.container}`}>
                    <Header />
                    <Feed />  
                    { userType === 'attendee' ? <ScanButton /> : <CreateButton /> }

                </div>
            )}
        </>
    )
      
}
