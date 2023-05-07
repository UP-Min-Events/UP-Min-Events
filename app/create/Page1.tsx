import styles from './page.module.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

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
        <div className={`${inter.className} ${styles.container}`}>
            <div className={styles.nav}>
                <Link href="\">
                    <ArrowBackIcon sx={{ color: '#a70000', scale: '150%', p:'0' }}/>
                </Link>
            </div>

            <div className={styles.header}>
                <h1>Create Event</h1>
                <div id={styles.progressBar}>
                    <div id={styles.progress}> </div> <div id={styles.progress1}> </div> 
                </div>   
            </div>   

            <div className={styles.formBody}>
                <div className={styles.formItem}>
                    <p>Title</p>
                    <input
                        type="text"
                        value={eventName}
                        onChange={handleEventNameChange}
                    />
                </div>
                <div className={styles.formItem}>
                    <p>Host</p>
                    <input
                        type="text"
                        value={eventHost}
                        onChange={handleEventHostChange}
                    />
                </div>
                <div className={styles.formItem}>
                    <p>Description</p>
                    <input
                        type="text"
                        value={eventDesc}
                        onChange={handleEventDescChange}
                    />
                </div>
            </div>

            <div className={styles.button}>
                <button className={`${inter.className} ${styles.buttonM}`} onClick={nextPage}>NEXT</button>
            </div>

        </div>
    )
}