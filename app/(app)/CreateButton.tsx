'use client'

import styles from './page.module.scss'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

import Link from 'next/link'

export default function CreateButton() {
    return(
        <div className={styles['button-wrapper']}>
            <Link className={styles.buttonL} href="/create">
                <AddCircleOutlineIcon /> 
                <p> Create Event </p>
            </Link>
        </div>
    )
}