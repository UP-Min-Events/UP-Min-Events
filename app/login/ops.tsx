'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { auth } from '../../firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

import upLogo from '../../public/uplogo.png'
import { Button } from '@mui/material'
import { Container } from '@mui/material'
import { Divider } from '@mui/material'
import { sizing } from '@mui/system';

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
                <h3> Know what's happening. </h3>

                <Divider variant="middle" sx={{ width: '75%', mx: 'auto' }} />
            </div>

            <div className={`${inter.className} ${styles.loginBody}`}>
                <h5> Log in as: </h5>
                <Button variant="text" className={`${inter.className} ${styles.button}`} onClick={SignIn}>Attendee</Button>
            </div>

        </Container>
    )
}