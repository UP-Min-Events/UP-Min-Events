'use client'

import styles from './page.module.scss'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Link from 'next/link'

export default function CreateButton() {
    return(
        <div className={styles['button-wrapper']}>
            <Link href="/create">
                <button className={styles.buttonL}> 
                    <AddCircleOutlineIcon /> 
                    <h2> Create Event </h2>
                </button>
            </Link>
        </div>
    )
}