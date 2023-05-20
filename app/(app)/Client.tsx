'use client'

import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import ScanButton from './ScanButton'
import CreateButton from './CreateButton'
import Feed from "./Feed"

import { useUserTypeContext } from "./providers/UserTypeProvider"
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
                    <Link href='/settings' className={styles.nav}>
                        <div className={styles['photo-wrapper']}>
                            <Image className={styles['profile-photo']} src={user?.photoURL ?? ''} width={56} height={56} alt='Profile Photo'/>
                        </div>
                        <div className={styles['info-wrapper']}>
                            { data.firstName === '' ?
                                <>
                                    <Skeleton variant='text' animation='wave' width='100%' height='2.25rem' />
                                    <Skeleton variant='text' animation='wave' width='100%' height='1.25rem' />
                                </>
                                :
                                <>
                                    <h1 className={styles['profile-name']}>{name}</h1>
                                    <p className={styles['profile-type']}> { userType === 'attendee' ? "Attendee" : "Organizer" } </p>
                                </>    
                            }
                        </div>
                    </Link>
                    <div className={styles['filter-wrapper']}>
                        <div className={styles['filter-chip-active']}>
                            All
                        </div>
                        <div className={styles['filter-chip']}>
                            Live
                        </div>
                        <div className={styles['filter-chip']}>
                            Future
                        </div>
                        <div className={styles['filter-chip']}>
                            Past
                        </div>
                    </div>
                    <Feed />  
                    { userType === 'attendee' ? <ScanButton /> : <CreateButton /> }

                </div>
            )}
        </>
    )
      
}
