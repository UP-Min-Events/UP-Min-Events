'use client'

import styles from './page.module.css'
import UserInfo from './UserInfo'
import UserDetails from './UserDetails'
import OrganizerDetails from './OrganizerDetails'

import { useState } from 'react'
import { useUserTypeContext } from '@/app/providers/UserTypeProvider'
import { auth } from "../../../firebaseConfig"
import { useRouter } from 'next/navigation'
import CircleLoading from '@/app/(app)/loadingui/CircleLoading'
import LogoutIcon from '@mui/icons-material/Logout';

export default function SettingsClient() {

    const { userType } = useUserTypeContext()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const SignOut = () => {
        auth.signOut();
        setLoading(true)
        router.push("/login")
    }

    return (
        <div className={styles.container}>
            { loading ?
                <CircleLoading />
                :
                <>    
                    <UserInfo />
                    { userType === 'attendee' ? <UserDetails/> : <OrganizerDetails />}
                    <div className={styles['button-wrapper']}>
                        <button className={styles['button-signout']} onClick={SignOut}>
                            <LogoutIcon /> Sign Out
                        </button>
                    </div>
                </>
            }
        </div>
    )
}