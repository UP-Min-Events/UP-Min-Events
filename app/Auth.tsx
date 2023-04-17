'use client'

import styles from './page.module.css'

export default function Auth(){
    return (
        <div className={styles.auth-rap}>
            <button className={styles.button}>Log in as Attendee</button>
        </div>
    )
}