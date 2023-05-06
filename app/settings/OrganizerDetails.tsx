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
                    <Link href="/profile/organization">Organization</Link>
                    <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                </div>
            </div>
        </div>
    )
}