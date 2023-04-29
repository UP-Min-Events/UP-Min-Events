'use client'

import { CircularProgress } from '@mui/material';
import styles from './page.module.css'

export default function Loading(){
    return (
        <div className={styles.loadingContainer}>
            <CircularProgress />
        </div>
    )
}