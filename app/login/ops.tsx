'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { auth } from '../../firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'


import { Stack, Button, Container, Divider } from '@mui/material'
import upLogo from '../../public/uplogo.png'

const inter = Inter({ subsets: ['latin']})

export default function Ops(){
    
    const [user] = useAuthState(auth)
    const pic = user?.photoURL
    const router = useRouter()

    const SignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ hd: "up.edu.ph" });
        
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
      }

    useEffect(() => {
        if(user) {
            router.push('/')
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

                <h1> Events </h1>
                <p> Know what's happening. </p>

                <Divider variant="middle" sx={{ width: '75%', mx: 'auto' }} />
            </div>

            <Stack spacing={1} className={`${inter.className} ${styles.loginBody}`} sx={{ display: 'flex', alignItems: 'center' }}>

                <p> Log in as: </p>
                <Button variant="text" className={inter.className} onClick={SignIn} 
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
                <Button variant="text" className={inter.className} onClick={SignIn}
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