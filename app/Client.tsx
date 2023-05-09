'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'

import SignOut from './SignOut'
import ScanButton from './ScanButton'
import CreateButton from './CreateButton'
import Feed from "./Feed";
import MyEvents from "./MyEvents"
import Header from './Header'

import { useUserTypeContext } from "./UserTypeProvider"
import { useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"

import { db, auth } from "../firebaseConfig"
import { doc, getDoc} from 'firebase/firestore'
import { useAuthState } from "react-firebase-hooks/auth"

import { Skeleton } from '@mui/material'

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
        let collection
        
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

                    <Suspense fallback={<Skeleton animation="wave" />}>
                        <div className={styles.nav}>
                            <Header 
                                firstName={data?.firstName}
                                lastName={data?.lastName}
                            />
                            <SignOut />
                        </div>
                    </Suspense>

                    <Suspense fallback={<Skeleton variant="rectangular" height={600} width={150} />}>
                        { userType === 'attendee' ? <Feed /> : <MyEvents /> }   
                    </Suspense>

                    <Suspense fallback={<Skeleton />}>
                        { userType === 'attendee' ? <ScanButton /> : <CreateButton /> }
                    </Suspense>

                </div>
            )}
        </>
    )
      
}
