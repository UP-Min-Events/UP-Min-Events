import styles from './page.module.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    nextPage: () => void,
    eventName: string,
    eventHost: string,
    eventDesc: string,
    handleEventNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventHostChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventDescChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function Page1({ 
    nextPage, 
    eventName,
    eventHost,
    eventDesc,
    handleEventNameChange, 
    handleEventHostChange, 
    handleEventDescChange 
} : Props) {
    
    return(
        <div className={`${inter.className} ${styles.form}`}>
            <div id={styles.formHeader}>
                <IconButton size="large"
                        sx={{
                            scale: '1.4',
                            position: 'relative',
                            left: '0',
                            color: '#a70000',
                            fontWeight: 'bold',
                            padding: '0',
                            mb: '1em',
                        }}> 
                        <Link href="\">
                            <ArrowBackIcon /> 
                        </Link>
                </IconButton> 
                <h1>Create Event</h1>
                <div id={styles.progressBar}>
                    <div id={styles.progress}> </div> <div id={styles.progress1}> </div> 
                </div>   
            </div>    
            <div>
                <p>Title</p>
                <input
                    type="text"
                    value={eventName}
                    onChange={handleEventNameChange}
                />
            </div>
            <div>
                <p>Host</p>
                <input
                    type="text"
                    value={eventHost}
                    onChange={handleEventHostChange}
                />
            </div>
            <div id="desc">
                <p>Description</p>
                <input
                    type="text"
                    value={eventDesc}
                    onChange={handleEventDescChange}
                />
            </div>

            <button id={styles.formButton} className={`${inter.className} ${stlyes.formButton}`} onClick={nextPage}>Next</button>
        </div>
    )
}