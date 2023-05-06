'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'

import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from 'next/image'
import Link from 'next/link'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const inter = Inter({ subsets: ['latin']})

export default function UserInfo(){

    const [user] = useAuthState(auth);

    return (
        <>
            {user && (
                <div className={`${inter.className} ${styles.infoContainer}`}>

                    <div className={styles.nav}>
                        <Link href="/"> 
                            <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', padding: '0' }} /> 
                        </Link> 
                    </div>

                    <div className={styles.header}>
                        <h2> Settings </h2>
                        <Image className={styles.img} src={user?.photoURL ?? ''} alt={user?.displayName || `User Avatar`} width="100" height="100" />
                        <h2> {user.displayName} </h2>
                        <p> {user.email} </p>
                        <p> student-number </p>
                    </div>
                </div>
            )}
        </>
    )
}