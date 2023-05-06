'use client'

import styles from './page.module.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Link from 'next/link'

export default function CreateButton() {
    return(
        <div className={styles.button}>
            <Link href="/create">
                <button className={styles.buttonL}> 
                    <AddCircleOutlineIcon /> 
                    <h2> Create Event </h2>
                </button>
            </Link>
        </div>
    )
}