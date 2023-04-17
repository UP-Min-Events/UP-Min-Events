import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Feed from "./Feed";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Client from './Client'

export const metadata = {
    title: "Home",
    description: "An event management system.",
};

export default function Home() {

    return (
        <>
            <Client />
        </>
    );
      
}
