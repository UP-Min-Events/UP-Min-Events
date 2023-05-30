'use client'

import styles from './page.module.scss'

import EventIcon from '@mui/icons-material/Event';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import Link from 'next/link'

export default function CreateButton() {
    return(
        <div className={styles['button-wrapper']}>
            <div className={styles['button-menu']}>
                <Link href="/">
                    <EventIcon sx={{ display: 'flex', scale: '125%', p: '0' }}/>
                </Link>
                <Link href="/create">
                    <AddCircleOutlineIcon sx={{ display: 'flex', scale: '125%', p: '0' }}/>
                </Link>
                <Link href="/settings">
                    <ManageAccountsIcon sx={{ display: 'flex', scale: '125%', p: '0' }}/> 
                </Link>
            </div>
        </div>
    )
}