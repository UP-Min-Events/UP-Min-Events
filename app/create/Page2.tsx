import styles from './page.module.css'
import { Inter } from 'next/font/google'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    createEvent: () => void,
    prevPage: () => void,
    eventDate: string,
    eventStartTime: string,
    eventEndTime: string,
    eventVenue: string,
    eventVisibility: string,
    handleEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVenueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVisibilityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function Page2({ 
    createEvent, 
    prevPage,
    eventDate,
    eventStartTime,
    eventEndTime,
    eventVenue,
    eventVisibility,
    handleEventDateChange,
    handleEventStartTimeChange,
    handleEventEndTimeChange,
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
                <ArrowBackIcon onClick={back} sx={{ color: '#a70000', scale: '150%', p:'0' }}/>
            </div>

            <div className={styles.header}>
                <h1>Create Event</h1>
                <div id={styles.progressBar}>
                    <div id={styles.progress}> </div> <div id={styles.progress}> </div> 
                </div>   
            </div>   

            <div className={styles.formBody}>
                <div className={styles.formItem}>
                    <p>Date</p>
                    <input
                        type="date"
                        value={eventDate}
                        onChange={handleEventDateChange}
                    />
                </div>
                <div className={styles.formItem}>
                    <p>Start Time</p>
                    <input
                        type="time"
                        value={eventStartTime}
                        onChange={handleEventStartTimeChange}
                    />
                </div>
                <div className={styles.formItem}>
                    <p>End Time</p>
                    <input
                        type="time"
                        value={eventEndTime}
                        onChange={handleEventEndTimeChange}
                    />
                </div>
                <div className={styles.formItem}>
                    <p>Venue</p>
                    <input 
                        type="text"
                        value={eventVenue}
                        onChange={handleEventVenueChange} 
                    />
                </div>
                <div className={styles.formItem}>
                    <p>Population Limit</p>
                    <input
                        type="number"
                    />
                </div>
                <div className={styles.formItem}>
                    <p>Visibility</p>
                    <select value={eventVisibility} onChange={handleEventVisibilityChange}>
                        <option value="" selected disabled hidden></option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <div className={styles.formItem}>
                    <p>Restrictions</p>
                    <input type="text" />
                </div>
            </div>

            <div className={styles.button}>
                <button className={`${inter.className} ${styles.buttonM}`} onClick={finish}>FINISH</button>
            </div>


        </div>
    )
}