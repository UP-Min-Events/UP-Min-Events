import styles from './page.module.scss'
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
    handleEventDescChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
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
                <Link className={styles['button-container']} href="\">
                    <ArrowBackIcon sx={{ color: '#a70000', scale: '150%', p:'0' }}/>
                </Link>
            </div>
            <div className={styles.header}>
                <h1>Create Event</h1>
                <div className={styles.progressBar}>
                    <div className={styles.progress}></div>
                    <div className={styles['progress-empty']}></div> 
                </div>   
            </div>   
            <div className={styles.formBody}>
                <div className={styles.formItem}>
                    <div className={styles['label-wrapper']}>
                        <p>Title</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <input
                            className={styles['input-element']}
                            type="text"
                            value={eventName}
                            onChange={handleEventNameChange}
                        />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <div className={styles['label-wrapper']}>
                        <p>Host</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <input
                            className={styles['input-element']}
                            type="text"
                            value={eventHost}
                            onChange={handleEventHostChange}
                        />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <div className={styles['label-wrapper']}>
                        <p>Description</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <textarea
                            className={`${styles['input-element']} ${inter.className}`}
                            value={eventDesc}
                            onChange={handleEventDescChange}
                        />
                    </div>
                </div>
            </div>

            <div className={styles['button-wrapper']}>
                <button className={`${styles.button}`} onClick={nextPage}>NEXT</button>
            </div>



        </div>
    )
}