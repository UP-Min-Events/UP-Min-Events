'use client'

import styles from '../page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

import { auth, db } from '../../../../firebaseConfig'
import { collection, doc, DocumentReference, DocumentData, deleteDoc, getDocs } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useUserTypeContext } from "../../providers/UserTypeProvider"
import { useRouter } from 'next/navigation'


const Account = () => {
    const [user] = useAuthState(auth);
    const { userType } = useUserTypeContext();
    const router = useRouter();
    const id = user?.uid;

    const SignOut = () => {
        auth.signOut();
        router.push("/login")
    }

    // Delete event associated with the deleted organizer
    const deleteEvent = async (): Promise<void> => {
        const docRef = collection(db, "events");
        const querySnapshot = await getDocs(docRef);

        querySnapshot.forEach((doc) => {
            if (doc.data().owner === id) {
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
        const docRef: DocumentReference<DocumentData> = doc(db, type, `${id}`);
        await deleteDoc(docRef);

        type === "organizers" && deleteEvent();
        deleteUserType();
        SignOut();
    };

    return (
        <>
            <div className={styles.nav}>
                <Link href="/settings">
                    <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} />
                </Link>
            </div>
            <button onClick={() => deleteUser()}>Delete Account</button>
        </>
    )
}

export default Account;