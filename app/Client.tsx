'use client'

import SignOut from './SignOut'
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Feed from "./Feed";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from 'next/link'

import PersonIcon from '@mui/icons-material/Person';
import { Button, Container } from '@mui/material'

export default function Client() {

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
                <Container maxWidth={false}
                    sx={{ 
                        my: 'auto',
                        mx: 'auto',
                        minHeight: '100vh',
                        display: 'grid'
                    }}
                >
                    <Container sx={{ mt: '4em', display: 'flex', justifyContent: 'space-between' }}>

                        <Link href="/profile"> 
                            <Button variant="text" startIcon={<PersonIcon sx = {{ color: '#a70000' }}/>}
                                sx={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                }}> 
                                {user.displayName} 
                            </Button> 
                        </Link>

                        <SignOut />

                    </Container>

                    <Feed />
                    <Link href="/scan">
                        <h2>Scan</h2>
                    </Link>
                </Container>
            )}
        </>
    );
      
}
