import styles from './page.module.scss'

import upLogo from '@/public/uplogo.png'
import Image from 'next/image'

export default function Header() {
    return (
        <div className={styles['nav-wrapper']}>
            <div className={styles['logo-wrapper']}>
                <Image className={styles.logo} src={upLogo} alt="UPMin Logo" width={65.625} height={53.25} priority/>
            </div>
            <div className={styles['info-wrapper']}>
                <p className={styles['event-title']}> Events </p>
                <p className={styles['event-subtitle']}> Know what&apos;s happening. </p>
            </div>
        </div>
    )
}