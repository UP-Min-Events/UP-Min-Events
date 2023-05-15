'use client'

import styles from './page.module.scss'
import Link from 'next/link'

import CropFreeIcon from '@mui/icons-material/CropFree';

export default function ScanButton(){
    return(
        <div className={styles['button-wrapper']}>
            <Link className={styles.buttonS} href="/scan">
                <CropFreeIcon sx={{ display: 'flex', scale: '215%', p: '0' }}/> 
            </Link>
        </div>

    )
}