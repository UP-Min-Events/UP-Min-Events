'use client'

import styles from '../page.module.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

export default function Notifications() {
    return (
        <div>
            <div className={styles.nav}>
                <Link href="/settings"> 
                    <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} /> 
                </Link> 
            </div>
            <div className={styles.headerContainer}>
                <h2 className={styles.header}> Notifications </h2>
            </div>
            <div className={styles['info-container']}> 
                <div className={styles.content}>
                    <p> no official app = no notifs :^) enjoy discovering the app! </p>
                </div>
            </div>
        </div>
    )
}