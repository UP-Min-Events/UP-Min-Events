'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '../../../firebaseConfig'
import { collection, doc, getDoc, query, where, DocumentSnapshot, DocumentReference, DocumentData, deleteDoc, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useUserTypeContext } from "../../providers/UserTypeProvider"
import { useRouter } from 'next/navigation'

const Account = () => {
    const [user] = useAuthState(auth);  
    const { userType } = useUserTypeContext();
    const router = useRouter();
    
    const SignOut = () => {
        auth.signOut();
        router.push("/login")
    }

    // Delete event associated with the deleted organizer
    const deleteEvent = async (): Promise<void> => {
        const docRef = collection(db, "events");
        const querySnapshot = await getDocs(docRef);

        querySnapshot.forEach((doc) => {
            if (doc.data().owner === user!.uid) {
                deleteDoc(doc.ref);
            }
        });
    };

    const deleteUserType = () => {
        localStorage.removeItem("userType");
    }
    
    // Delete User
    const deleteUser = async (): Promise<void> => {
        const type = userType + "s";
        const docRef: DocumentReference<DocumentData> = doc(db, type, user!.uid); 
        await deleteDoc(docRef);

        type === "organizers" && deleteEvent();
        deleteUserType();
        SignOut();
    };

    useEffect(() => {
        console.log(userType);
        // console.log(getData());
    }, [])

    return (
        <>
            <button onClick={() => deleteUser()}>Delete Account</button>
        </>
    )
}

export default Account;