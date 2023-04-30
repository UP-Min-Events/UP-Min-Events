'use client'

import SignOut from './SignOut'
import ScanButton from './ScanButton'
import CreateButton from './CreateButton'
import Feed from "./Feed";
import MyEvents from "./MyEvents";
import Link from 'next/link'
import { useUserTypeContext } from "./UserTypeProvider";
import { useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

import PersonIcon from '@mui/icons-material/Person';
import { Button, Container, Skeleton } from '@mui/material'

export default function Client() {

    const [user, loading] = useAuthState(auth)
    const router = useRouter()
    const { userType } = useUserTypeContext()

    useEffect(() => {

        if (!user && !loading) {
            router.push("/login")
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

                    <Suspense fallback={<Skeleton variant="rectangular" />}>
                        {
                            userType === 'attendee' ? <Feed /> : <MyEvents />
                        }
                    </Suspense>
                    
                    <Suspense fallback={<Skeleton />}>
                        {
                            userType === 'attendee' ? <ScanButton /> : <CreateButton />
                        }
                    </Suspense>

                </Container>
            )}
        </>
    );
      
}
