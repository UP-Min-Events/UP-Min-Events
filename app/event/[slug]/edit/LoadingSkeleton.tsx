'use client'

import styles from './page.module.scss'
import Skeleton from '@mui/material/Skeleton'

export default function LoadingSkeleton() {
    return (
        <div className={styles['sk-wrapper']}>
            <div className={styles['sk-navigation-wrapper']}>
                <Skeleton 
                    animation='wave' 
                    width='2rem' 
                    height='2rem' 
                />
            </div>
            <div className={styles['sk-form-wrapper']}>
                <div className={styles['sk-top-section']}>
                    <Skeleton 
                        sx={{ borderRadius: '0.75rem' }}
                        variant='rounded' 
                        animation='wave' 
                        width='100%' 
                        height='18.125rem'
                    />
                </div>
                <div className={styles['sk-bottom-section']}>
                    <Skeleton
                        sx={{ borderRadius: '0.75rem' }}
                        variant='rounded'
                        animation='wave' 
                        width='100%' 
                        height='10rem'
                    />
                </div>
                <div className={styles['sk-save-wrapper']}>
                    <Skeleton 
                        sx={{ borderRadius: '0.75rem' }}
                        variant='rounded' 
                        animation='wave' 
                        width='100%' 
                        height='3rem'
                    />
                </div>
            </div>
        </div>
    )
}