'use client'

import styles from './page.module.css'

import UserInfo from './UserInfo'
import UserDetails from './UserDetails'
import OrganizerDetails from './OrganizerDetails'
import { useUserTypeContext } from '../UserTypeProvider'

export default function ProfileClient() {

    const { userType } = useUserTypeContext()

    return (
        <div className={styles.container}>
            <UserInfo />
            { userType === 'attendee' ? <UserDetails/> : <OrganizerDetails />}
        </div>
    )
}