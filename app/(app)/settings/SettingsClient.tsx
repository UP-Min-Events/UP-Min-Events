'use client'

import styles from './page.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import UserInfo from './UserInfo'
import UserDetails from './UserDetails'
import OrganizerDetails from './OrganizerDetails'
import { useUserTypeContext } from '../providers/UserTypeProvider'
import { auth } from "../../../firebaseConfig"
import { useRouter } from 'next/navigation'

export default function SettingsClient() {

    const { userType } = useUserTypeContext()
    const router = useRouter()

    const SignOut = () => {
        auth.signOut();
        router.push("/login")
    }

    return (
        <div className={styles.container}>
            <UserInfo />
            { userType === 'attendee' ? <UserDetails/> : <OrganizerDetails />}
            <button className={styles['button-signout']} onClick={SignOut}>
                <LogoutIcon />
                Sign Out
            </button>
        </div>
    )
}