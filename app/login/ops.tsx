'use client'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { auth } from '../../firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

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
        <div className={inter.className}>
            <button className={`${inter.className} ${styles.button}`} onClick={SignIn}>log in as attendee</button>
        </div>
    )
}