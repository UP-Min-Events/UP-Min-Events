'use client'

import UserInfo from './UserInfo'
import UserDetails from './UserDetails'
import OrganizerDetails from './OrganizerDetails'
import { useUserTypeContext } from '../UserTypeProvider'

export default function ProfileClient() {

    const { userType } = useUserTypeContext()

    return (
        <div>
            <UserInfo />
            { userType === 'attendee' ? <UserDetails/> : <OrganizerDetails />}
        </div>
    )
}