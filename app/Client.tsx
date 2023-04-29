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
import { Button, Container, IconButton, Box, Skeleton } from '@mui/material'

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

                    <Suspense fallback={<Skeleton />}>
                        <Container sx={{ mt: '2em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link href="/profile"> 
                                <Button variant="text" startIcon={<PersonIcon sx = {{ color: '#a70000', scale: '150%' }}/>}
                                    sx={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontSize: '18px'
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
                    
                    <Container sx={{ justifyContent: 'center', display: 'flex' }}>
                        <Box
                            sx={{
                                backgroundColor: '#a70000',
                                display: 'flex',
                                position: 'fixed',
                                bottom: '3em',
                                width: '5em',
                                height: '5em',
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
                                        scale: '250%',
                                        color: 'white',
                                    }}
                                > 
                                    <CropFreeIcon sx={{ textAlign: 'center', display: 'flex' }}/> 
                                </IconButton>
                            </Link>
                        </Box>
                    </Container>

                </Container>
            )}
        </>
    );
      
}
