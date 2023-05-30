import styles from './page.module.scss'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const inter = Inter({ subsets: ['latin'] })

interface Props {
    createEvent: () => void,
    prevPage: () => void,
    isButtonDisabled: boolean,
    eventDate: string,
    eventStartTime: string,
    eventEndTime: string,
    eventVenue: string,
    eventVisibility: string,
    coOwners: string[],
    handleEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVenueChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleEventVisibilityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleCoOwnerChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void,
    handleAddCoOwnerFields: () => void,
    handleCoOwnerRemoveFields: (index: number) => void
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
    handleEventDateChange,
    handleEventStartTimeChange,
    handleEventEndTimeChange,
    handleEventVenueChange,
    handleEventVisibilityChange,
    handleCoOwnerChange,
    handleAddCoOwnerFields,
    handleCoOwnerRemoveFields
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
                            className={styles['input-element']}
                            type="date"
                            value={eventDate}
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
                            className={styles['input-element']}
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
                        <p>Add Co-Owner (Optional)</p>
                    </div>
                    <div className={styles['input-wrapper']}>
                        {coOwners.map((coOwner, index) => (
                            <div key={index}>
                                <input
                                    type='email'
                                    value={coOwner}
                                    onChange={(event) => handleCoOwnerChange(index, event)}
                                />
                                <button type="button" onClick={() => handleCoOwnerRemoveFields(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddCoOwnerFields}>
                            Add Co-Owner
                        </button>
                    </div>
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