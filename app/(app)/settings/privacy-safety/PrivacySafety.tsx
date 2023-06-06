'use client'

import styles from '../page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

export default function PrivacySafety() {
    return (
        <div>
            <div className={styles.nav}>
                <Link href="/settings"> 
                    <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} /> 
                </Link> 
            </div>
            <div className={styles.headerContainer}>
                <h2 className={styles.header}> Privacy and Safety </h2>
            </div>
            <div className={styles.infoBox}> 
                <div className={styles.content}>
                    <p> For safety purposes, this app will not be made public and will only be used for the purposes of the course until affiliated with official university affairs. </p> &nbsp;
                    <p> Any personal information will be kept with utmost privacy. </p>
                </div>
            </div>
        </div>
    )
}