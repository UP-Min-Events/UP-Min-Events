'use client'

import SignOut from './SignOut'
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import Feed from "./Feed";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from 'next/link'

import PersonIcon from '@mui/icons-material/Person';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Button, Container, IconButton, Box } from '@mui/material'
import { Just_Me_Again_Down_Here } from 'next/font/google';

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
                        height: '100vh',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >   

                    <Suspense fallback={<p>Loading pa ang profile oy..</p>}>
                        <Container sx={{ mt: '4em', display: 'flex', justifyContent: 'space-between' }}>
                            <Link href="/profile"> 
                                <Button variant="text" startIcon={<PersonIcon sx = {{ color: '#a70000', scale: '150%' }}/>}
                                    sx={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontSize: '20px'
                                    }}> 
                                    {user.displayName} 
                                </Button> 
                            </Link>
                            <SignOut />
                        </Container>
                    </Suspense>

                    <Suspense fallback={<p>Loading pa oy..</p>}>
                        <Feed />
                    </Suspense>
                    
                    <Box
                        sx={{
                            backgroundColor: '#a70000',
                            display: 'flex',
                            position: 'fixed',
                            bottom: '2.5em',
                            width: '6em',
                            height: '6em',
                            borderRadius: '1.75em',
                            boxShadow: '0 0 5px 0 rgba(0,0,0,0.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Link href="/scan">
                            <IconButton size="large"                                
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    fontWeight: 'bold',
                                    scale: '275%',
                                    color: 'white',
                                }}
                            > 
                                <CropFreeIcon sx={{ textAlign: 'center', display: 'flex' }}/> 
                            </IconButton>
                        </Link>
                    </Box>
                </Container>
            )}
        </>
    );
      
}
