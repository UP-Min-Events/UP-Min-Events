'use client'

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Feed from "./Feed";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from 'next/link'

export const metadata = {
    title: "Home",
    description: "An event management system.",
};

export default function Home() {

    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    
    useEffect(() => {

        if (!user && !loading) {
            router.push("/login");
        }
    }, [user, loading])

    return (
        <>
            {user && (
                <main>
                    <Link href="/profile">Profile</Link>
                    <Feed />
                </main>
            )}
        </>
    );
      
}
