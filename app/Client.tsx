'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'

import SignOut from './SignOut'
import ScanButton from './ScanButton'
import CreateButton from './CreateButton'
import Feed from "./Feed";
import MyEvents from "./MyEvents";
import Link from 'next/link'
import { useUserTypeContext } from "./UserTypeProvider";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import PersonIcon from '@mui/icons-material/Person';
import { Button, Skeleton } from '@mui/material'

const inter = Inter({ subsets: ['latin']})

export default function Client() {

    const [user, loading] = useAuthState(auth)
    const router = useRouter()
    const { userType } = useUserTypeContext()

    useEffect(() => {

        if (!user && !loading) {
            router.push("/login")
        }
    }, [user, loading])

    return (
        <>
            {user && (
                <div className={`${inter.className} ${styles.container}`}>

                    <Suspense fallback={<Skeleton animation="wave" />}>
                        <div className={styles.nav}>
                            <Link href="/profile"> 
                                <Button variant="text" startIcon={<PersonIcon sx = {{ color: '#a70000', scale: '150%' }}/>}
                                    sx={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontSize: '18px'
                                    }}> 
                                    {user.displayName} 
                                </Button> 
                            </Link>
                            <SignOut />
                        </div>
                    </Suspense>

                    <Suspense fallback={<Skeleton variant="rectangular" height={600} width={150} />}>
                        {
                            userType === 'attendee' ? <Feed /> : <MyEvents />
                        }   
                    </Suspense>
                    
                    <Suspense fallback={<Skeleton />}>
                        {
                            userType === 'attendee' ? <ScanButton /> : <CreateButton />
                        }
                    </Suspense>

                </div>
            )}
        </>
    );
      
}
