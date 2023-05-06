import Link from 'next/link'

import styles from './page.module.css'
import { Inter } from 'next/font/google'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const inter = Inter({ subsets: ['latin']})

export default function UserDetails(){
    return (
        <div className={`${inter.className} ${styles.infoContainer}`}>
            <div className={styles.infoBox}>
                <div className={styles.item}>
                    <Link href="/profile/student-number">Student Number</Link>
                    <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                </div>
                <div className={styles.item}>
                    <Link href="/profile/year-level">Year Level</Link>
                    <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                </div>
                <div className={styles.item}>
                    <Link href="/profile/degree-program">Degree Program</Link>
                    <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                </div>
                <div className={styles.item}>
                    <Link href="/profile/college-department">College/Department</Link>
                    <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                </div>
            </div>
            <div className={styles.infoBox}>
                <div className={styles.item}>
                    <Link href="/profile/about">About</Link>
                    <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                </div>
                <div className={styles.item}>
                    <Link href="/profile/notifications">Notifications</Link>
                    <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                </div>
                <div className={styles.item}>
                    <Link href="/profile/privacy-safety">Privacy and Safety</Link>
                    <ArrowForwardIosIcon sx={{ color: '#a70000', scale: '0.75' }}/>
                </div>
            </div>
        </div>
    )
}