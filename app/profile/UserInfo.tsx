'use client'

import styles from './page.module.css'
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import { IconButton } from '@mui/material'
import { Container } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const inter = Inter({ subsets: ['latin']})

export default function UserInfo(){

    const [user] = useAuthState(auth);

    return (
        <>
            {user && (
                <div>
                    <Container sx={{ display: 'flex', position: 'relative', mt: '4em', justifyContent: 'center', padding: '0.5em' }}>

                        <Link href="/"> 
                            <IconButton size="large" className={styles.backButton}> <ArrowBackIcon /> </IconButton> 
                        </Link> 

                        <div className={`${inter.className} ${styles.settings}`}> Settings </div>
                    </Container>

                    <Container maxWidth={false}
                        sx={{ 
                            mx:'auto', 
                            mt: '2em', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center'
                        }}
                    
                    >
                        <Image className={styles.img} src={user?.photoURL!} alt={user?.displayName!} width="100" height="100" />

                        <h2 className={`${inter.className} ${styles.username}`}> {user.displayName} </h2>
                    </Container>
                </div>
            )}
        </>
    )
}