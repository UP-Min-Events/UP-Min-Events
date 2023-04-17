'use client'

import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from 'next/image'

export default function UserInfo(){

    const [user] = useAuthState(auth);

    return (
        <>
            {user && (
                <div>
                    <h1>{user.displayName}</h1>
                    <Image src={user?.photoURL!} alt={user?.displayName!} width="200" height="200"/>
                </div>
            )}
        </>
    )
}