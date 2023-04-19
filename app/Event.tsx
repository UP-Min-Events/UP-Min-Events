import Link from 'next/link'
import styles from './page.module.css'

import { Box, IconButton } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowBack';

interface Props {
    key: string,
    name: string,
    date: string,
    time: string
}

export default function Event({ key, name, date, time } : Props){
    return (
        <Link className={styles.event} href={`/${key}`}>
            <Box
                sx={{
                    width: '100%',
                    height: 'auto',   
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                    borderRadius: '0.5em',
                    my: '0.25em',
                    padding: '1em'
                }}
            >
                <h2>{name}</h2>
                <p>{date}</p>
                <p>{time}</p>
            </Box>
        </Link>
    )
}