'use client'

import styles from './page.module.css'
import Link from 'next/link'

import CropFreeIcon from '@mui/icons-material/CropFree';

export default function ScanButton(){
    return(
        <div className={styles.button}>
            <Link href="/scan">
                <button className={styles.buttonS}> 
                    <CropFreeIcon sx={{ display: 'flex', scale: '225%', p: '0' }}/> 
                </button>
            </Link>
        </div>

    )
}