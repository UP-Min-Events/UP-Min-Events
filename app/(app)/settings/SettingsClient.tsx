'use client'

import styles from './page.module.scss'
import UserInfo from './UserInfo'
import UserDetails from './UserDetails'
import OrganizerDetails from './OrganizerDetails'
import LogoutIcon from '@mui/icons-material/Logout';

import { auth } from "@/firebaseConfig"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUserTypeContext } from '@/app/providers/UserTypeProvider'
import CircleLoading from '@/app/(app)/loadingui/CircleLoading'

export default function SettingsClient() {

    const router = useRouter()
    const { userType } = useUserTypeContext()
    const [loading, setLoading] = useState<boolean>(false)

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
                        <button className={styles['signout-button']} onClick={SignOut}>
                            <LogoutIcon /> Sign Out
                        </button>
                    </div>
                </>
            }
        </div>
    )
}