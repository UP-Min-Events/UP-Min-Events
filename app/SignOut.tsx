'use client'

import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";

import { IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

export default function SignOut(){

    const router = useRouter();

    const SignOut = () => {
        auth.signOut();
        router.push("/login");
    }

    return (
        <div>
            <IconButton aria-label="signOut" size="medium" onClick={SignOut}> <LogoutIcon sx={{ color: '#a70000', scale: '150%' }} /> </IconButton>
        </div>
    )
}