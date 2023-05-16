'use client'

import { Skeleton } from '@mui/material'
import styles from './index.module.scss'

export default function IndexSkeleton(){
    return(
        <div className={styles['page-wrapper']}>
            <div className={styles['nav-wrapper']}>
                <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="5.625rem" />
            </div>
            <div className={styles['events-container']}>
                <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="6.625rem" />
                <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="6.625rem" />
                <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="6.625rem" />
                <Skeleton sx={{ borderRadius: '1rem' }}variant="rounded" animation="wave" width="100%" height="6.625rem" />
            </div>
        </div>
    )
}