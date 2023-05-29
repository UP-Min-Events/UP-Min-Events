import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import upLogo from '@/public/uplogo.png'
import Image from 'next/image'

export default function Header() {
    return (
        <div className={styles['nav-wrapper']}>
            <div className={styles['logo-wrapper']}>
                <Link href="/settings">
                    <Image className={styles.logo} src={upLogo} alt="UPMin Logo" width={65.625} height={53.25} priority/>
                </Link>
            </div>
            <div className={styles['info-wrapper']}>
                <p className={styles['event-title']}> Events </p>
                <p className={styles['event-subtitle']}> Know what's happening. </p>
            </div>
        </div>
    )
}