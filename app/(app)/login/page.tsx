import LoginOps from './LoginOps'
import upLogo from '../../public/uplogo.png'
import styles from './page.module.css'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin']})

export const metadata = {
    title: 'Login',
    description: 'Login using your UP Mail account.',
}

export default function Auth(){
    return (
        <div className={styles.container}>
            <div className={`${styles.loginHeader} ${inter.className}`}>
                <Image className={styles.logo} src={upLogo} alt="UPMin Logo" width={175} height={142} priority/>
                    <h1>Events</h1>
                    <p>Know what&apos;s happening.</p>
            </div>
            <div className={`${inter.className} ${styles.loginBody}`}>
                <p>Log in as:</p>
                <LoginOps />
            </div>
        </div>
    )
}