'use client'

import styles from './page.module.scss'
import Link from 'next/link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  

export default function Navigation({ id } : { id : string }){
    return (
        <div className={styles['navigation-wrapper']}>
            <Link href={`/event/${id}`}>
                <ArrowBackIcon sx={{ scale: '150%', color: '#a70000', p: '0' }} />
            </Link>
        </div>
    )
}
     