'use client'

import styles from './page.module.scss'
import { Inter } from 'next/font/google'

import Header from './Header'
import ScanButton from './ScanButton'
import CreateButton from './CreateButton'
import Feed from "./Feed"

import { useUserTypeContext } from "../providers/UserTypeProvider"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import { db, auth } from "../../firebaseConfig"
import { doc, getDoc} from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth"

import { Skeleton } from "@mui/material"

const inter = Inter({ subsets: ['latin']})

interface Name {
    firstName: string;
    lastName: string;
}

export default function Client() {

    const [data, setData] = useState<Name>({ firstName: "", lastName: "" })
    const [user, loading] = useAuthState(auth)
    const { userType } = useUserTypeContext()
    const router = useRouter()

    const name = data.lastName + ", " + data.firstName

    const getDetail = async ({ collection } : { collection: string}) => {        
        const docRef = doc(db, `${collection}`, `${user?.uid}`)
        const docSnap = await getDoc(docRef)

        setData(docSnap.data() as Name)
    }
    
    useEffect(() => {
        if (!user && !loading) {
            router.push("/login")
        }

    }, [user, loading])

    useEffect(() => {
        if (!user) return

        let collection: string
        
        if (userType === 'attendee') {
            collection = 'attendees'
        } else {
            collection = 'organizers'
        }
        
        getDetail({ collection })
    }, [user])


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
