import styles from './page.module.scss'
import { Inter } from 'next/font/google'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    createEvent: () => void,
    prevPage: () => void,
    isButtonDisabled: boolean,
    eventDate: string,
    eventTime: string,
    eventVenue: string,
    eventVisibility: string,
    handleEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVenueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVisibilityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function Page2({ 
    createEvent, 
    prevPage,
    isButtonDisabled,
    eventDate,
    eventTime,
    eventVenue,
    eventVisibility,
    handleEventDateChange,
    handleEventTimeChange,
    handleEventVenueChange,
    handleEventVisibilityChange,
} : Props ) {
    
    const finish = () => {
        createEvent()
    }

    const back = () => {
        prevPage()
    }

    return(
        <div className={`${inter.className} ${styles.container}`}>
            <div className={styles.nav}>
                <div className={styles['button-container']}>
                    <ArrowBackIcon onClick={back} sx={{ color: '#a70000', scale: '150%', p:'0' }}/>
                </div>
            </div>
            <div className={styles.header}>
                <h1>Create Event</h1>
                <div className={styles.progressBar}>
                    <div className={styles.progress}></div> 
                    <div className={styles.progress}></div>
                </div>   
            </div>   
            <div className={styles.formBody}>
                <div className={styles.formItem}>
                    <div className={styles['label-wrapper']}>
                        <p>Date</p>
                    </div>
                    <div className={`${styles['input-wrapper']} ${inter.className}`}>
                        <input
                            className={styles['input-element']}
                            type="date"
                            value={eventDate}
                            onChange={handleEventDateChange}
                        />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <div className={styles['label-wrapper']}>
                        <p>Time</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <input
                            className={`${styles['input-element']} ${inter.className}`}
                            type="time"
                            value={eventTime}
                            onChange={handleEventTimeChange}
                        />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <div className={styles['label-wrapper']}>
                        <p>Venue</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <input
                            className={styles['input-element']}
                            type="text"
                            value={eventVenue}
                            onChange={handleEventVenueChange} 
                        />
                    </div>
                </div>
                <div className={styles.formItem}>
                    <div className={styles['label-wrapper']}>
                        <p>Visibility</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <select
                            className={styles['input-element']} 
                            value={eventVisibility} 
                            onChange={handleEventVisibilityChange}
                        >
                            <option value="Private" selected>Private</option>
                            <option value="Public">Public</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles['button-wrapper']}>
                <button 
                    className={`${inter.className} ${styles.button}`} 
                    onClick={finish}
                    disabled={isButtonDisabled}
                >
                    FINISH
                </button>
            </div>


        </div>
    )
}