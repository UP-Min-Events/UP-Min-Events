import Link from 'next/link'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const inter = Inter({ subsets: ['latin']})

export default function OrganizerDetails() {
    return (
        <div className={`${inter.className} ${styles.infoContainer}`}>
            <div className={styles.infoBox}>
                <div className={styles.item}>
                    Name
                    <Link href="/settings/name">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles.item}>
                    College
                    <Link href="/settings/college">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles['item-bottom']}>
                    Affliated Organization
                    <Link href="/settings/organization">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
            </div>
            <div className={styles.infoBox}>
                <div className={styles.item}>
                    About
                    <Link href="/settings/about">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles.item}>
                    Notifications
                    <Link href="/settings/notifications">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
                <div className={styles['item-bottom']}>
                    Privacy and Safety
                    <Link href="/settings/privacy-safety">
                        <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}