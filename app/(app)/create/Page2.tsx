import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const inter = Inter({ subsets: ['latin'] })

interface Props {
    createEvent: () => void,
    prevPage: () => void,
    isButtonDisabled: boolean,
    eventDate: Date,
    eventStartTime: string,
    eventEndTime: string,
    eventVenue: string,
    eventVisibility: string,
    coOwners: string[],
    coOwnerPlaceholder: string,
    handleEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVenueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVisibilityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleCoOwnerChange: (index: number, value: string) => void,
    handleAddCoOwner: () => void,
    handleRemoveCoOwner: (index: number) => void,
    setCoOwnerPlaceholder: (coOwnerPlaceholder: string) => void,
}

export default function Page2({
    createEvent,
    prevPage,
    isButtonDisabled,
    eventDate,
    eventStartTime,
    eventEndTime,
    eventVenue,
    eventVisibility,
    coOwners,
    coOwnerPlaceholder,
    handleEventDateChange,
    handleEventStartTimeChange,
    handleEventEndTimeChange,
    handleEventVenueChange,
    handleEventVisibilityChange,
    handleCoOwnerChange,
    handleAddCoOwner,
    handleRemoveCoOwner,
    setCoOwnerPlaceholder
}: Props) {

    const finish = () => {
        createEvent()
    }

    const back = () => {
        prevPage()
    }

    return (
        <div className={`${inter.className} ${styles.container}`}>
            <div className={styles.nav}>
                <div className={styles['button-container']}>
                    <ArrowBackIcon onClick={back} sx={{ color: '#a70000', scale: '150%', p: '0' }} />
                </div>
            </div>
            <div className={styles.header}>
                <h1>Create Event</h1>
                <div className={styles.progressBar}>
                    <div className={styles.progress}></div>
                    <div className={styles.progress}></div>
                </div>
            </div>
            <div className={styles['form-body']}>
                <div className={styles['form-item']}>
                    <div className={styles['label-wrapper']}>
                        <p>Date</p>
                    </div>
                    <div className={`${styles['input-wrapper']} ${inter.className}`}>
                        <input
                            className={`${styles['input-element']} ${inter.className}`}
                            type="date"
                            value={eventDate.toISOString().slice(0, 10)}
                            onChange={handleEventDateChange}
                        />
                    </div>
                </div>
                <div className={styles['form-item']}>
                    <div className={styles['label-wrapper']}>
                        <p>Start Time</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <input
                            className={`${styles['input-element']} ${inter.className}`}
                            type="time"
                            value={eventStartTime}
                            onChange={handleEventStartTimeChange}
                        />
                    </div>
                </div>
                <div className={styles['form-item']}>
                    <div className={styles['label-wrapper']}>
                        <p>End Time</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <input
                            className={`${styles['input-element']} ${inter.className}`}
                            type="time"
                            value={eventEndTime}
                            onChange={handleEventEndTimeChange}
                        />
                    </div>
                </div>
                <div className={styles['form-item']}>
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
                <div className={styles['form-item']}>
                    <div className={styles['label-wrapper']}>
                        <p>Visibility</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        <select
                            className={styles['input-element']}
                            value={eventVisibility}
                            onChange={handleEventVisibilityChange}
                        >
                            <option value="" selected disabled hidden></option>
                            <option value="Private" selected>Private</option>
                            <option value="Public">Public</option>
                        </select>
                    </div>
                </div>
                <div className={styles['form-item']}>
                    <div className={styles['label-wrapper']}>
                        <p>Include Co-Owner [Optional]</p>
                        <div className={styles.note}>
                            Input email address of Co-Owner.
                        </div>
                    </div>
                    <div className={`${styles['input-wrapper']} ${inter.className}`}>
                        <input
                            className={styles['input-element']}
                            type="text"
                            value={coOwnerPlaceholder}
                            onChange={(e) => setCoOwnerPlaceholder(e.target.value)}
                        />
                        <div className={styles['owner-button']}>
                            <AddIcon sx={{ scale: '0.75', color: '#a70000', p: '0' }}/>
                            <button onClick={handleAddCoOwner}> Add Co-Owner </button>
                        </div>
                    </div>
                    {coOwners.map((coOwner, index) => (
                        <div className={`${styles['input-wrapper']} ${inter.className}`} key={index}>
                            <input
                                className={styles['input-element']}
                                type="text"
                                value={coOwner}
                                onChange={(e) => handleCoOwnerChange(index, e.target.value)}
                            />
                            <div className={styles['owner-button']}>
                                <RemoveIcon sx={{ scale: '0.75', color: '#a70000', p: '0' }}/>
                                <button onClick={() => handleRemoveCoOwner(index)}> Remove Co-Owner </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Link className={styles['button-wrapper']} href="/">
                <button
                    className={`${inter.className} ${styles.button}`}
                    onClick={finish}
                    disabled={isButtonDisabled}
                >
                    FINISH
                </button>
            </Link>
        </div>
    )
}