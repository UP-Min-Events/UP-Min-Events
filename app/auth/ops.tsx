'use client'

import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Image from 'next/image'

import { auth } from '../../firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const inter = Inter({ subsets: ['latin']})

export default function Ops(){
    
    const [user] = useAuthState(auth)
    const pic = user?.photoURL

    const SignIn = () => {

        const provider = new GoogleAuthProvider()
        
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential?.accessToken
                const user = result.user
            }).catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                const email = error.email
                const credential = GoogleAuthProvider.credentialFromError(error)
            })
    }

    const SignOut = () => {
        auth.signOut()
    }
    
    return (
        <div className={inter.className}>
            <button onClick={SignIn}>Sign In with Google</button>

            <button onClick={SignOut}>Sign Out</button>
            {user ? <div>In</div> : <div>Out</div>}
            {user && 
                <div>
                    <div>Welcome: {user.displayName}</div>
                    <div>Email: {user.email}</div>
                    <div>UID: {user.uid}</div>
                    <Image src={pic} alt={`${user.displayName}'s photo`} width='100' height='100' />
                </div>
            }
        </div>
    )
}