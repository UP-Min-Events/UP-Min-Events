'use client'

import { auth } from "../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function SignOut(){

    const router = useRouter();

    const SignOut = () => {
        auth.signOut();
        router.push("/login");
    }

    return (
        <div>
            <button onClick={SignOut} >Sign Out</button>
        </div>
    )
}