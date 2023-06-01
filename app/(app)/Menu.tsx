'use client'

import styles from './page.module.scss'
import Link from 'next/link'

import { useUserTypeContext } from '../providers/UserTypeProvider';

import EventIcon from '@mui/icons-material/Event';
import CropFreeIcon from '@mui/icons-material/CropFree';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export default function Menu(){

    const { userType } = useUserTypeContext()

    return(
        <div className={styles['button-wrapper']}>
            <div className={styles['button-menu']}>
                <Link href="/">
                    <EventIcon sx={{ display: 'flex', scale: '125%', p: '0' }}/>
                </Link>
                { userType === 'organizer' &&
                    <>
                        <Link href="/create">
                            <AddCircleOutlineIcon sx={{ display: 'flex', scale: '125%', p: '0' }}/>
                        </Link>
                    </>
                }
                {
                    userType === 'attendee' &&
                    <>
                        <Link href="/scan">
                            <CropFreeIcon sx={{ display: 'flex', scale: '125%', p: '0' }}/>
                        </Link>
                    </>
                }
                <Link href="/settings">
                    <ManageAccountsIcon sx={{ display: 'flex', scale: '125%', p: '0' }}/> 
                </Link>
            </div>
        </div>

    )
}