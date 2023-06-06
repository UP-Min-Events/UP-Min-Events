'use client'

import styles from '../page.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

export default function About() {
    return (
        <div>
            <div className={styles.nav}>
                <Link href="/settings"> 
                    <ArrowBackIcon sx={{ scale: '125%', color: '#a70000', p: '0' }} /> 
                </Link> 
            </div>
            <div className={styles.headerContainer}>
                <h2 className={styles.header}> About </h2>
            </div>
            <div className={styles.infoBox}> 
                <div className={styles.content}>
                    <p> UPMin Events is an event management app developed by Nhyl Bryle Iba&#241;ez, Anakin Skywalker Pactores, and Rafael Paderna. </p>
                    <p> This app is developed as a final project for CMSC 127: File and Database Management Systems. The app's tech stack includes NextJS, Typescript, and Firebase. The development duration lasted 2 months.</p>
                    <p> This project was managed by Mikaella Ba&#241;ez, Bea Totanes, Mark Valderrama, and Ron Vertudes.</p>
                    <p> As of June 2023, this app is not affiliated with any official university affairs.</p>
                </div>
            </div>
        </div>
    )
}